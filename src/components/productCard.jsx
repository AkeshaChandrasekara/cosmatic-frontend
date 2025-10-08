// src/components/ProductCard.jsx

import React from 'react';

const ProductCard = ({ imageSrc, brandName, productName, discount, currentPrice, oldPrice }) => {
    return (
        <div className="relative w-full max-w-xs bg-white rounded-lg group">
            {/* Discount Badge */}
            {discount && (
                <span className="absolute top-0 left-0 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-br-lg z-10">
                    {discount}
                </span>
            )}

            {/* Product Image */}
            <div className="overflow-hidden bg-gray-100 rounded-t-lg">

                <img
                    src={imageSrc}
                    alt={productName}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            {/* Product Info */}
            <div className="p-3 text-sm">
                <p className="font-semibold text-gray-800 h-10 overflow-hidden mb-1">
                    {brandName} {productName}
                </p>

                {/* Price Info */}
                <div className="flex items-baseline space-x-2 mt-2">
                    <p className="text-red-600 font-bold">
                        Rs {currentPrice.toLocaleString('en-IN')}
                    </p>
                    <p className="text-gray-400 line-through text-xs">
                        Rs {oldPrice.toLocaleString('en-IN')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;