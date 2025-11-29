import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { cartItems } = location.state || { cartItems: [] };

    const [shippingDetails, setShippingDetails] = useState({
        name: '',
        email: '',
        mobile: '',
        address: '',
        postalCode: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getCurrentUserEmail = () => {
        const token = localStorage.getItem("token");
        if (!token) return null;
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(atob(base64));
            return payload.email || payload.sub;
        } catch (e) {
            return null;
        }
    };

    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        
        if (!shippingDetails.name || !shippingDetails.email || !shippingDetails.mobile || !shippingDetails.address || !shippingDetails.postalCode) {
            toast.error('Please fill all shipping details');
            return;
        }

        if (!shippingDetails.email.includes('@')) {
            toast.error('Please enter a valid email address');
            return;
        }

        if (shippingDetails.mobile.length < 10) {
            toast.error('Please enter a valid mobile number');
            return;
        }

        setIsSubmitting(true);

        try {
            const userEmail = getCurrentUserEmail();
            const orderId = 'ORD' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
            
            const orderData = {
                orderId,
                shippingDetails,
                items: cartItems,
                totalAmount: calculateTotal(),
                orderDate: new Date().toISOString(),
                status: 'confirmed',
                userEmail: userEmail
            };

            if (userEmail) {
                const userOrders = JSON.parse(localStorage.getItem(`orders_${userEmail}`) || '[]');
                userOrders.push(orderData);
                localStorage.setItem(`orders_${userEmail}`, JSON.stringify(userOrders));
            }

            const allOrders = JSON.parse(localStorage.getItem('all_orders') || '[]');
            allOrders.push(orderData);
            localStorage.setItem('all_orders', JSON.stringify(allOrders));

            toast.success('Order placed successfully!');
            
            const email = getCurrentUserEmail();
            if (email) {
                const currentCart = JSON.parse(localStorage.getItem(`cart_${email}`) || '[]');
                const updatedCart = currentCart.filter(cartItem => 
                    !cartItems.some(orderItem => orderItem.productID === cartItem.productID)
                );
                localStorage.setItem(`cart_${email}`, JSON.stringify(updatedCart));
                window.dispatchEvent(new CustomEvent('cartUpdated'));
            }

            navigate('/order-confirmation', { 
                state: { 
                    orderId: orderId,
                    orderDetails: orderData
                } 
            });

        } catch (error) {
            console.error('Order submission error:', error);
            toast.error('Failed to place order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
                    <FiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">No Items to Checkout</h2>
                    <p className="text-gray-600 mb-8">Your cart is empty or no items were selected for checkout.</p>
                    <button
                        onClick={() => navigate('/cart')}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Back to Cart
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-9xl mx-auto px-4 sm:px-6 py-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-6">Shipping Information</h2>
                        
                        <form onSubmit={handleSubmitOrder} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={shippingDetails.name}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={shippingDetails.email}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Mobile Number *
                                    </label>
                                    <input
                                        type="tel"
                                        name="mobile"
                                        value={shippingDetails.mobile}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="Enter your mobile number"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Delivery Address *
                                </label>
                                <textarea
                                    name="address"
                                    value={shippingDetails.address}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="Enter your complete delivery address"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Postal Code *
                                </label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={shippingDetails.postalCode}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="Enter your postal code"
                                    required
                                />
                            </div>
                        </form>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
                        
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.productID} className="flex gap-3">
                                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                        <img
                                            src={item.images?.[0] || "/placeholder-image.jpg"}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.target.src = "/placeholder-image.jpg"; }}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-gray-900 text-sm truncate">
                                            {item.name}
                                        </h4>
                                        <p className="text-gray-500 text-sm">
                                            Qty: {item.quantity}
                                        </p>
                                        <p className="font-semibold text-gray-900">
                                            Rs {(item.price * item.quantity).toLocaleString('en-IN')}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-medium">Rs {calculateTotal().toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Shipping</span>
                                <span className="font-medium text-green-600">Free</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                                <span>Total</span>
                                <span>Rs {calculateTotal().toLocaleString('en-IN')}</span>
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                            <h4 className="font-semibold text-blue-900 text-sm mb-2">
                                Important Note
                            </h4>
                            <p className="text-blue-700 text-sm">
                                Your order will be processed within 24 hours. You'll receive a confirmation email with tracking details once your order is shipped.
                            </p>
                        </div>

                        <button
                            type="submit"
                            onClick={handleSubmitOrder}
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                        >
                            {isSubmitting ? 'Placing Order...' : 'Place Order'}
                        </button>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default CheckoutPage;