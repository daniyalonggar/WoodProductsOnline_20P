from django.contrib.auth.models import User
from django.http import HttpResponse
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from Project import settings
from .filters import ProductFilter
from .models import Product, Review, Cart, Order, Category, Wishlist
from .serializers import ProductSerializer, ReviewSerializer, CartSerializer, OrderSerializer, CategorySerializer, \
    WishlistSerializer, WishListCreateSerializer
from rest_framework_simplejwt.tokens import RefreshToken


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = ProductFilter
    pagination_class = PageNumberPagination


# Review ViewSet
class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        product = Product.objects.get(id=self.kwargs['product_id'])
        serializer.save(product=product, user=self.request.user)


# Cart ViewSet
class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)


# Order ViewSet
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user_cart = Cart.objects.filter(user=self.request.user)
        total_price = sum(item.product.price * item.quantity for item in user_cart)
        serializer.save(user=self.request.user, total_price=total_price)


# Category ViewSet
class CategoryViewSet(viewsets.ModelViewSet):
    pagination_class = None
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


# Wishlist ViewSet
class WishlistViewSet(viewsets.ModelViewSet):
    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return WishListCreateSerializer
        return WishlistSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'], url_path='status/(?P<product_id>[^/.]+)')
    def check_status(self, request, product_id=None):
        user = request.user
        exists = Wishlist.objects.filter(user=user, product_id=product_id).exists()
        return Response({"isInWishlist": exists}, status=status.HTTP_200_OK)


# JWT Login and Registration Views

# Advanced Search View
class AdvancedSearchView(APIView):
    def get(self, request):
        query = request.query_params.get('q', '')
        products = Product.objects.filter(name__icontains=query)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
