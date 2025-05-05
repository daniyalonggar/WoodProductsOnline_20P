import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {addToWishlist, checkWishlistStatus, fetchProductByIdAPI, removeFromWishlist} from "../api";
import Container from "../components/boxes/Container";
import {Heart, Share2, ChevronRight, ChevronLeft, Loader2} from "lucide-react";
import {useSelector} from "react-redux";

const ProductDetails = () => {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isWishlist, setIsWishlist] = useState(false);
    const token = useSelector((state) => state.user.token);


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productData = await fetchProductByIdAPI(id);
                setProduct(productData);

                const wishlistStatus = await checkWishlistStatus(id, token);
                setIsWishlist(wishlistStatus.isInWishlist);
            } catch (err) {
                setError("Failed to load product details");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, token]);

    const handleWishlist = async () => {
        try {
            if (isWishlist) {
                await removeFromWishlist(id, token);
            } else {
                await addToWishlist(id, token);
            }
            setIsWishlist(!isWishlist);
        } catch (error) {
            console.error("Failed to update wishlist", error);
        }
    };
    const handleQuantityChange = (type) => {
        if (type === "increment" && quantity < (product?.stock || 1)) {
            setQuantity((prev) => prev + 1);
        }
        if (type === "decrement" && quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    const images = product?.image ? Array(4).fill(product.image) : Array(4).fill("/api/placeholder/600/400");

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500"/>
            </div>
        );
    }


    return (
        <Container>
            <div className="container mx-auto p-4 mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Section - Images */}
                    <div className="space-y-6">
                        <div className="relative group">
                            <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100">
                                <img
                                    src={images[selectedImage]}
                                    alt={product?.name || "Product Image"}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <button
                                onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : images.length - 1)}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <ChevronLeft className="w-5 h-5"/>
                            </button>
                            <button
                                onClick={() => setSelectedImage(prev => prev < images.length - 1 ? prev + 1 : 0)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <ChevronRight className="w-5 h-5"/>
                            </button>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                                        selectedImage === idx ? 'border-orange-500 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                                    }`}
                                >
                                    <img src={img} alt={`${product?.name || 'Product'} view ${idx + 1}`}
                                         className="w-full h-full object-cover"/>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                {product?.name}
                            </h1>
                            <p className="text-4xl text-orange-500 font-bold">
                                {product?.price ? `${product.price} ₽` : "Price not available"}
                            </p>
                            {product?.stock <= 5 && (
                                <p className="mt-2 text-red-500">
                                    Only {product.stock} items left in stock!
                                </p>
                            )}
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-gray-200 rounded-lg">
                                    <button
                                        onClick={() => handleQuantityChange("decrement")}
                                        className="p-3 hover:bg-gray-50 transition-colors disabled:opacity-50"
                                        disabled={quantity <= 1}
                                    >
                                        <ChevronLeft className="w-5 h-5"/>
                                    </button>
                                    <span className="px-6 font-medium">{quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange("increment")}
                                        className="p-3 hover:bg-gray-50 transition-colors disabled:opacity-50"
                                        disabled={quantity >= (product?.stock || 1)}
                                    >
                                        <ChevronRight className="w-5 h-5"/>
                                    </button>
                                </div>
                                <button
                                    onClick={handleWishlist}
                                    className={`p-3 rounded-lg border transition-colors ${
                                        isWishlist
                                            ? 'border-orange-500 text-orange-500'
                                            : 'border-gray-200 text-gray-500 hover:border-orange-500 hover:text-orange-500'
                                    }`}
                                >
                                    <Heart className={`w-5 h-5 ${isWishlist ? 'fill-orange-500' : ''}`}/>
                                </button>
                                <button
                                    className="p-3 rounded-lg border border-gray-200 text-gray-500 hover:border-orange-500 hover:text-orange-500 transition-colors">
                                    <Share2 className="w-5 h-5"/>
                                </button>
                            </div>

                            <button
                                className="w-full bg-orange-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:hover:bg-orange-500"
                                disabled={product?.stock === 0}
                            >
                                {product?.stock === 0 ? 'Out of Stock' : 'Купить сейчас'}
                            </button>
                        </div>

                        <div className="space-y-6 divide-y divide-gray-100">
                            <div className="space-y-4 pt-6">
                                <h2 className="text-xl font-bold text-gray-900">Описание</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    {product?.description || "No description available."}
                                </p>
                            </div>

                            <div className="space-y-4 pt-6">
                                <h2 className="text-xl font-bold text-gray-900">Характеристики</h2>
                                <div className="grid gap-4">
                                    {[
                                        {label: "Категория", value: `Category ${product?.category}`},
                                        {label: "ID товара", value: product?.id},
                                        {label: "В наличии", value: `${product?.stock} шт.`},
                                        {label: "Ширина створки", value: "600, 700, 800, 900 мм"},
                                        {label: "Высота створки", value: "2000, 2100 мм"},
                                        {label: "Двухстворчатость", value: "все модели коллекции"},
                                        {label: "Подходящие системы", value: "София, Magic, Plexy"},
                                    ].map((spec, idx) => (
                                        <div key={idx} className="flex py-2 border-b border-gray-100 last:border-0">
                                            <span className="text-gray-600 w-1/3">{spec.label}</span>
                                            <span className="text-gray-900 font-medium">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ProductDetails;