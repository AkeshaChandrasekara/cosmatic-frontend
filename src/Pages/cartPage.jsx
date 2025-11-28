import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
    FiShoppingCart, 
    FiTrash2, 
    FiPlus, 
    FiMinus, 
    FiArrowLeft,
    FiCreditCard
} from "react-icons/fi";
import Footer from '../components/Footer';
import { 
    loadCart, 
    updateCartItemQuantity, 
    removeFromCart, 
    clearCart, 
    getCartWithProductDetails,
    getCartSummary 
} from '../../utils/cartUtils';
import toast from 'react-hot-toast';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
        
        const handleCartUpdate = () => {
            fetchCart();
        };
        
        window.addEventListener('cartUpdated', handleCartUpdate);
        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
        };
    }, []);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const cartData = await getCartWithProductDetails();
            setCartItems(cartData);
            setSelectedItems(cartData.map(item => item.productID));
        } catch (error) {
            setCartItems([]);
            setSelectedItems([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectItem = (productID) => {
        setSelectedItems(prev => {
            if (prev.includes(productID)) {
                return prev.filter(id => id !== productID);
            } else {
                return [...prev, productID];
            }
        });
    };

    const handleSelectAll = () => {
        if (selectedItems.length === cartItems.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(cartItems.map(item => item.productID));
        }
    };

    const handleQuantityChange = async (productID, newQuantity) => {
        if (newQuantity < 1) return;
        
        try {
            setUpdating(true);
            updateCartItemQuantity(productID, newQuantity);
           // toast.success('Quantity updated successfully');
        } catch (error) {
            toast.error('Failed to update quantity');
        } finally {
            setUpdating(false);
        }
    };

    const handleRemoveItem = async (productID) => {
        const itemName = cartItems.find(item => item.productID === productID)?.name || 'Item';
        
        toast((t) => (
            <div className="text-center">
                <p className="mb-3">Are you sure you want to remove this item from cart?</p>
                <div className="flex gap-2 justify-center">
                    <button
                        onClick={async () => {
                            try {
                                setUpdating(true);
                                removeFromCart(productID);
                                setSelectedItems(prev => prev.filter(id => id !== productID));
                                toast.dismiss(t.id);
                                toast.success(`${itemName} removed from cart`);
                            } catch (error) {
                                toast.error('Failed to remove item from cart');
                            } finally {
                                setUpdating(false);
                            }
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                    >
                        Yes, Remove
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ), {
            duration: 10000,
        });
    };

    const handleClearCart = async () => {
        toast((t) => (
            <div className="text-center">
                <p className="mb-3">Are you sure you want to clear your cart?</p>
                <div className="flex gap-2 justify-center">
                    <button
                        onClick={async () => {
                            try {
                                setUpdating(true);
                                clearCart();
                                setSelectedItems([]);
                                toast.dismiss(t.id);
                                toast.success('Cart cleared successfully');
                            } catch (error) {
                                toast.error('Failed to clear cart');
                            } finally {
                                setUpdating(false);
                            }
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                    >
                        Yes, Clear Cart
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ), {
            duration: 10000,
        });
    };

    const handleCheckout = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please login to proceed with checkout');
            navigate('/login');
            return;
        }

        if (selectedItems.length === 0) {
            toast.error('Please select at least one item to checkout');
            return;
        }

        toast.success('Proceeding to checkout...');
    };

    const getSelectedItemsSummary = () => {
        const selectedCartItems = cartItems.filter(item => selectedItems.includes(item.productID));
        const totalItems = selectedCartItems.reduce((total, item) => total + item.quantity, 0);
        const totalAmount = selectedCartItems.reduce((total, item) => {
            return total + (item.price ? item.price * item.quantity : 0);
        }, 0);
        
        return {
            totalItems,
            totalAmount
        };
    };

    const selectedSummary = getSelectedItemsSummary();
    const isCartEmpty = cartItems.length === 0;
    const allSelected = cartItems.length > 0 && selectedItems.length === cartItems.length;

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <div className="max-w-9xl mx-auto px-4 sm:px-6 py-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="bg-white rounded-lg p-4 border border-gray-200">
                                        <div className="flex gap-4">
                                            <div className="w-20 h-20 bg-gray-200 rounded"></div>
                                            <div className="flex-1 space-y-2">
                                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-white rounded-lg p-6 border border-gray-200 h-64">
                                <div className="space-y-3">
                                    <div className="h-4 bg-gray-200 rounded"></div>
                                    <div className="h-4 bg-gray-200 rounded"></div>
                                    <div className="h-8 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-9xl mx-auto px-4 sm:px-6 py-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
                    </div>
                </div>

                {isCartEmpty ? (
                    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FiShoppingCart className="w-10 h-10 text-gray-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                            Looks like you haven't added any items to your cart yet. Start shopping to discover amazing products!
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => navigate('/product')}
                                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                            >
                                Continue Shopping
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                            >
                                Go to Home
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.productID} className="bg-white rounded-xl border border-gray-200 p-4">
                                    <div className="flex gap-4">
                                        <div className="flex items-start">
                                            <input
                                                type="checkbox"
                                                checked={selectedItems.includes(item.productID)}
                                                onChange={() => handleSelectItem(item.productID)}
                                                className="w-4 h-4 mt-8 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                            />
                                        </div>

                                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                            <img
                                                src={item.images?.[0] || "/placeholder-image.jpg"}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => { e.target.src = "/placeholder-image.jpg"; }}
                                            />
                                        </div>
                                        
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-900 mb-1 truncate">{item.name || `Product ${item.productID}`}</h3>
                                            <p className="text-sm text-gray-500 mb-2">Product ID: {item.productID}</p>
                                            
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-lg font-bold text-gray-900">
                                                        Rs {item.price?.toLocaleString('en-IN') || 'N/A'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="mt-2 pt-2 border-t border-gray-100">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-gray-600">Item Total:</span>
                                                    <span className="font-semibold text-gray-900">
                                                        Rs {item.price ? (item.price * item.quantity).toLocaleString('en-IN') : 'N/A'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex flex-col items-end justify-between self-stretch">
                                            <button
                                                onClick={() => handleRemoveItem(item.productID)}
                                                disabled={updating}
                                                className="p-2 mt-5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <FiTrash2 className="w-4 h-4" />
                                            </button>
                                            
                                            <div className="flex items-center gap-2 mt-auto">
                                                <button
                                                    onClick={() => handleQuantityChange(item.productID, item.quantity - 1)}
                                                    disabled={item.quantity <= 1 || updating}
                                                    className="p-1 border border-green-700 rounded hover:bg-green-50 disabled:opacity-50"
                                                >
                                                    <FiMinus className="w-3 h-3 text-green-800" />
                                                </button>
                                                <span className="px-2 py-0 min-w-4 text-center border border-white rounded font-medium">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => handleQuantityChange(item.productID, item.quantity + 1)}
                                                    disabled={updating}
                                                    className="p-1 border border-green-700 rounded hover:bg-green-50 disabled:opacity-50"
                                                >
                                                    <FiPlus className="w-3 h-3 text-green-800" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4"> Summary</h3>
                                
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Subtotal ({selectedSummary.totalItems} items)</span>
                                        <span className="font-medium">Rs {selectedSummary.totalAmount.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="font-medium text-green-600">Free</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-3">
                                        <div className="flex justify-between text-lg font-bold">
                                            <span>Total</span>
                                            <span>Rs {selectedSummary.totalAmount.toLocaleString('en-IN')}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <button
                                    onClick={handleCheckout}
                                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                                >
                                    Proceed to Checkout
                                </button>
                                
                                <div className="mt-4 text-center">
                                    <Link
                                        to="/product"
                                        className="text-green-600 hover:text-green-700 font-medium text-sm"
                                    >
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            <Footer />
        </div>
    );
};

export default CartPage;