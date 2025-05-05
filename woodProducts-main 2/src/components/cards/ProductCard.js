import React from "react";
import {useNavigate} from "react-router-dom";

function ProductCard({productData, cardWidth = 300}) {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/products/${productData.id}`);
    };

    return (
        <article
            onClick={handleCardClick}
            className="overflow-hidden border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
            style={{width: `${cardWidth}px`}}
            aria-label={`Product card for ${productData.name}`}
        >
            <div className="relative aspect-square mb-4">
                {productData.image ? (
                    <img
                        src={productData.image}
                        alt={productData.name}
                        className="w-full h-full object-cover rounded-md"
                    />
                ) : (
                    <div
                        className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500 rounded-md">
                        No image available
                    </div>
                )}
            </div>

            <div className="flex flex-col items-start w-full">
                <h2 className="font-medium text-lg text-gray-800 truncate w-full">
                    {productData.name || "Unnamed Product"}
                </h2>
                <p className="text-xl font-bold text-gray-900 mt-2">
                    {productData.price ? `${productData.price}` : "Price not available"}
                </p>
            </div>

            <div className="flex justify-end items-center w-full mt-4">
                <button
                    className="px-4 py-2 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors uppercase"
                    onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Buy ${productData.name}`);
                    }}
                    aria-label={`Buy ${productData.name}`}
                >
                    купить
                </button>
            </div>
        </article>
    );
}

export default ProductCard;