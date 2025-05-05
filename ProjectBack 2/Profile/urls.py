from django.urls import path, include
from rest_framework.routers import DefaultRouter
from Profile.views import LoginView, RegisterView, PasswordResetRequestView, PasswordResetConfirmView, \
    send_test_email, UserViewSet

# Create a router instance
router = DefaultRouter()

# Register the UserViewSet with the router
router.register(r'api/v1/me', UserViewSet, basename='me')

urlpatterns = [
    # Other paths
    path('api/v1/login/', LoginView.as_view(), name='login'),
    path('api/v1/register/', RegisterView.as_view(), name='register'),
    path('api/v1/password_reset/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('api/v1/password_reset/confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(),
         name='password_reset_confirm'),
    path("MailTest/", send_test_email, name="MailTest"),

    # Include the router's URLs (this will automatically generate the correct routes)
    path('', include(router.urls)),
]
