// src/components/ProductCard.jsx
import React from 'react';
import { Link } from "react-router-dom";
import { FiHeart, FiEye, FiShoppingCart } from "react-icons/fi";

const ProductCard = ({ product }) => {
    // Safe access with default values
    if (!product) {
        return (
            <div className="group relative bg-white rounded-xl shadow-sm overflow-hidden flex flex-col h-full border border-gray-200 animate-pulse">
                <div className="relative aspect-square overflow-hidden m-2 rounded-lg bg-gray-200"></div>
                <div className="p-3 pt-1 flex flex-col flex-grow">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="mt-auto">
                        <div className="h-6 bg-gray-200 rounded mb-2"></div>
                        <div className="grid grid-cols-2 gap-2 mt-3">
                            <div className="h-8 bg-gray-200 rounded"></div>
                            <div className="h-8 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Safe destructuring with defaults
    const {
        productID = '',
        name = 'Product Name',
        stock = 0,
        price = 0,
        labelledPrice = 0,
        images = []
    } = product;

    const isDiscounted = price < labelledPrice;
    const discountPercentage = isDiscounted
        ? Math.round(((labelledPrice - price) / labelledPrice) * 100)
        : 0;
    const isInStock = stock > 0;

    const handleAddToCart = () => {
        console.log("Add to cart:", productID);
    };

    const toggleWishlist = () => {
        console.log("Toggle wishlist:", productID);
    };

    return (
        <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 
        overflow-hidden flex flex-col h-full border border-green-100 hover:border-green-200">
           
            <div className="relative aspect-square overflow-hidden m-2 rounded-lg bg-gray-50">
                <img
                    src={images[0] || "/placeholder-image.jpg"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={name}
                    onError={(e) => {
                        e.target.src = "/placeholder-image.jpg";
                    }}
                />
            
            
                <button
                    onClick={toggleWishlist}
                    className="absolute top-2 right-2 p-2 rounded-full bg-white text-green-600 
                    hover:bg-green-50 hover:text-green-700 transition-all duration-300 shadow-sm"
                >
                    <FiHeart className="w-4 h-4" />
                </button>

                {isDiscounted && (
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-green-500 to-green-600 text-white 
                    w-10 h-10 flex items-center justify-center text-xs font-bold rounded-full shadow-lg z-10 
                    border border-white/20">
                        {discountPercentage}% OFF
                    </div>
                )}

                <div
                    className={`absolute bottom-2 left-2 text-xs font-bold px-2 py-1 rounded-full shadow-sm ${
                        isInStock ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}
                >
                    {isInStock ? "In Stock" : "Out of Stock"}
                </div>
            </div>

           
            <div className="p-3 pt-1 flex flex-col flex-grow">
             
                <div className="mb-2">
                    <h2 className="text-md font-bold text-gray-800 line-clamp-2 leading-tight mb-1">
                        {name}
                    </h2>
                    <p className="text-[10px] text-gray-400">ID: {productID}</p>
                </div>

                <div className="mt-auto mb-3">
                    <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-lg font-bold text-slate-950">
                            Rs {price.toLocaleString('en-IN')}
                        </span>
                        {isDiscounted && (
                            <span className="text-lg font-bold text-red-500 line-through">
                                Rs {labelledPrice.toLocaleString('en-IN')}
                            </span>
                        )}
                    </div>
                    
                  
                    {isDiscounted ? (
                        <p className="text-sm text-green-600 font-bold">
                            Save Rs {(labelledPrice - price).toLocaleString('en-IN')}
                        </p>
                    ) : (
                        <div className="h-4"></div>
                    )}
                </div>

            
                <div className="mt-auto pt-3 border-t border-gray-100 grid grid-cols-2 gap-2">
                    <Link
                        to={`/product/${productID}`}
                        className="text-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 
                        font-medium py-2 px-2 rounded-lg transition-all duration-300 text-xs hover:shadow-sm 
                        active:scale-95 flex items-center justify-center"
                    >
                        <FiEye className="w-3 h-3 mr-1" />
                        Details
                    </Link>
                    <button
                        onClick={handleAddToCart}
                        disabled={!isInStock}
                        className={`text-center ${
                            isInStock 
                                ? "bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800" 
                                : "bg-gray-300 cursor-not-allowed text-gray-500"
                        } font-medium py-2 px-2 rounded-lg transition-all duration-300 text-xs hover:shadow-sm 
                        active:scale-95 flex items-center justify-center`}
                    >
                        <FiShoppingCart className="w-3 h-3 mr-1" />
                        {isInStock ? "Add to Cart" : "Out of Stock"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;