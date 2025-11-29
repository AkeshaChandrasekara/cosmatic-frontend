import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHeart, FiArrowLeft } from 'react-icons/fi';
import { getCurrentUserEmail } from '../../utils/cartUtils';
import toast from 'react-hot-toast';
import Footer from '../components/Footer';
import ProductCard from '../components/productCard';

const WishlistPage = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchWishlist();
        
        const handleWishlistUpdate = () => {
            fetchWishlist();
        };
        
        window.addEventListener('cartUpdated', handleWishlistUpdate);
        return () => {
            window.removeEventListener('cartUpdated', handleWishlistUpdate);
        };
    }, []);

    const fetchWishlist = () => {
        const email = getCurrentUserEmail();
        if (!email) {
            setWishlistItems([]);
            setLoading(false);
            return;
        }

        const wishlist = JSON.parse(localStorage.getItem(`wishlist_${email}`) || '[]');
        setWishlistItems(wishlist);
        setLoading(false);
    };

    const moveAllToCart = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please login to add items to cart');
            navigate('/login');
            return;
        }

        let successCount = 0;
        wishlistItems.forEach(product => {
            const productDetails = {
                name: product.name,
                price: product.price,
                labelledPrice: product.labelledPrice,
                images: product.images,
                category: product.category,
                stock: product.stock
            };
            
            const email = getCurrentUserEmail();
            if (!email) return;

            const cart = JSON.parse(localStorage.getItem(`cart_${email}`) || '[]');
            const existingItem = cart.find(item => item.productID === product.productID);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    productID: product.productID,
                    quantity: 1,
                    ...productDetails,
                    addedAt: new Date().toISOString()
                });
            }
            
            localStorage.setItem(`cart_${email}`, JSON.stringify(cart));
            successCount++;
        });

        if (successCount > 0) {
            toast.success(`${successCount} items added to cart`);
            window.dispatchEvent(new Event('cartUpdated'));
        }
    };

    const clearWishlist = () => {
        const email = getCurrentUserEmail();
        if (!email) return;

        localStorage.removeItem(`wishlist_${email}`);
        setWishlistItems([]);
        toast.success('Wishlist cleared');
        window.dispatchEvent(new Event('cartUpdated'));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <div className="max-w-9xl mx-auto px-4 sm:px-6 py-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="bg-white rounded-lg p-4 border border-gray-200">
                                    <div className="w-full h-48 bg-gray-200 rounded mb-4"></div>
                                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                                    <div className="h-8 bg-gray-200 rounded"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const isWishlistEmpty = wishlistItems.length === 0;

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-9xl mx-auto px-4 sm:px-6 py-8">
                <div className="flex items-center gap-4 mb-6">
                   
                    <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
                </div>

                {isWishlistEmpty ? (
                    <div className="bg-white rounded-xl border border-gray-200 p-12 max-w-5xl mx-auto text-center">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FiHeart className="w-10 h-10 text-gray-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Your wishlist is empty</h2>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                            Looks like you haven't added any items to your wishlist yet. Start exploring our products!
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => navigate('/product')}
                                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                            >
                                Browse Products
                            </button>
                           
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-gray-600">
                                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} in wishlist
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={moveAllToCart}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                                >
                                    Add All to Cart
                                </button>
                                <button
                                    onClick={clearWishlist}
                                    className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
                                >
                                    Clear Wishlist
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {wishlistItems.map((item) => (
                                <ProductCard 
                                    key={item.productID} 
                                    product={item}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default WishlistPage;