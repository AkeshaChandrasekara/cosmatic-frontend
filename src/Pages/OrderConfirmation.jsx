import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FiCheckCircle, FiShoppingBag, FiPackage, FiTruck } from 'react-icons/fi';
import Footer from '../components/footer';

const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { orderId, orderDetails } = location.state || {};

    if (!orderId || !orderDetails) {
        return (
            <div className="min-h-screen bg-white flex flex-col">
                <div className="flex-1 flex items-center justify-center">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h2>
                        <p className="text-gray-600 mb-8">Unable to find order details.</p>
                        <button
                            onClick={() => navigate('/')}
                            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Go to Home
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <div className="flex-1 py-6">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                        
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-4 border-b border-green-100 text-center">
                            <FiCheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                            <h1 className="text-2xl font-bold text-gray-900 mb-1">Order Confirmed!</h1>
                            <p className="text-gray-600 text-md">Thank you for your purchase</p>
                            <p className="text-green-600 font-semibold text-xs mt-1">Order ID: #{orderId}</p>
                        </div>

                        <div className="p-4">
                            <div className="space-y-4">
                                
                                <div className="bg-gray-50 rounded p-3">
                                    <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-md">
                                        <FiPackage className="w-4 h-4 text-green-600" />
                                        Order Summary
                                    </h2>
                                    <div className="space-y-2 mb-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Order Date:</span>
                                            <span className="font-medium">
                                                {new Date(orderDetails.orderDate).toLocaleDateString('en-IN')}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Items:</span>
                                            <span className="font-medium">
                                                {orderDetails.items.reduce((total, item) => total + item.quantity, 0)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Status:</span>
                                            <span className="font-medium text-green-600 capitalize">
                                                {orderDetails.status}
                                            </span>
                                        </div>
                                        <div className="flex justify-between font-bold border-t border-gray-200 pt-2 text-sm">
                                            <span>Total Amount:</span>
                                            <span className="text-green-600">
                                                Rs {orderDetails.totalAmount.toLocaleString('en-IN')}
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2 text-md">Ordered Items</h3>
                                        <div className="space-y-2">
                                            {orderDetails.items.map((item) => (
                                                <div key={item.productID} className="flex gap-2 p-2 bg-white rounded border text-xs">
                                                    <div className="w-10 h-10 bg-white rounded overflow-hidden flex-shrink-0">
                                                        <img
                                                            src={item.images?.[0] || "/placeholder-image.jpg"}
                                                            alt={item.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-medium text-gray-900 mb-1">
                                                            {item.name}
                                                        </h4>
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-gray-600">
                                                                Qty: {item.quantity}
                                                            </span>
                                                            <span className="font-semibold text-gray-900">
                                                                Rs {(item.price * item.quantity).toLocaleString('en-IN')}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded p-3">
                                    <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-md">
                                        <FiTruck className="w-4 h-4 text-green-600" />
                                        Shipping Information
                                    </h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="font-semibold text-gray-900 text-sm mb-2">Contact Details</h4>
                                            <p className="text-gray-700 text-sm mb-1">{orderDetails.shippingDetails.name}</p>
                                            <p className="text-gray-600 text-sm mb-1">{orderDetails.shippingDetails.email}</p>
                                            <p className="text-gray-600 text-sm">{orderDetails.shippingDetails.mobile}</p>
                                        </div>
                                        
                                        <div>
                                            <h4 className="font-semibold text-gray-900 text-sm mb-2">Delivery Address</h4>
                                            <p className="text-gray-700 text-sm whitespace-pre-line mb-1">
                                                {orderDetails.shippingDetails.address}
                                            </p>
                                            <p className="text-gray-600 text-xs">
                                                Postal: {orderDetails.shippingDetails.postalCode}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="flex gap-2 justify-center mt-4 pt-4 border-t border-gray-200">
                                <Link
                                    to="/product"
                                    className="flex items-center justify-center gap-1 px-4 py-2 bg-green-600 text-white rounded
                                     hover:bg-green-700 transition-colors font-semibold text-md"
                                >
                                    <FiShoppingBag className="w-4 h-4" />
                                    Continue Shopping
                                </Link>
                                <button
                                    onClick={() => navigate('/orders')}
                                    className="flex items-center justify-center gap-1 px-4
                                     py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors font-semibold text-md"
                                >
                                    <FiPackage className="w-4 h-4" />
                                    View All Orders
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default OrderConfirmation;