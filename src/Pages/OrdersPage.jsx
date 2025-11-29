import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiPackage, FiShoppingBag, FiHome, FiCalendar, FiDollarSign, FiTruck, FiUser, FiCheckCircle, FiTruck as FiShipped, FiXCircle, FiClock } from 'react-icons/fi';
import Footer from '../components/Footer';
import { getUserOrders, getCurrentUserEmail } from '../../utils/cartUtils';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = () => {
        setLoading(true);
        try {
            const userOrders = getUserOrders();
            const sortedOrders = userOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
            setOrders(sortedOrders);
        } catch (error) {
            console.error('Error loading orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed': return 'text-green-600 bg-green-50 border-green-200';
            case 'shipped': return 'text-blue-600 bg-blue-50 border-blue-200';
            case 'delivered': return 'text-purple-600 bg-purple-50 border-purple-200';
            case 'cancelled': return 'text-red-600 bg-red-50 border-red-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'confirmed': return <FiClock className="w-3 h-3" />;
            case 'shipped': return <FiShipped className="w-3 h-3" />;
            case 'delivered': return <FiCheckCircle className="w-3 h-3" />;
            case 'cancelled': return <FiXCircle className="w-3 h-3" />;
            default: return <FiPackage className="w-3 h-3" />;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex flex-col">
                <div className="flex-1 py-8">
                    <div className="max-w-9xl mx-auto px-4 sm:px-6">
                        <div className="animate-pulse space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
                                    <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                        <div className="h-4 bg-gray-200 rounded"></div>
                                        <div className="h-4 bg-gray-200 rounded"></div>
                                        <div className="h-4 bg-gray-200 rounded"></div>
                                    </div>
                                    <div className="h-20 bg-gray-200 rounded"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <div className="flex-1 py-8">
                <div className="max-w-9xl mx-auto px-4 sm:px-6">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                          
                            My Orders
                        </h1>
                    </div>

                    {orders.length === 0 ? (
                        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FiPackage className="w-8 h-8 text-gray-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">No Orders Yet</h2>
                            <p className="text-gray-600 mb-8 max-w-md mx-auto">
                                You haven't placed any orders yet. Start shopping to discover amazing organic products!
                            </p>
                            <div className="flex gap-4 justify-center">
                                <Link
                                    to="/product"
                                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                                >
                                    <FiShoppingBag className="w-4 h-4 inline mr-2" />
                                    Start Shopping
                                </Link>
                                <Link
                                    to="/"
                                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                                >
                                    <FiHome className="w-4 h-4 inline mr-2" />
                                    Go to Home
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div key={order.orderId} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="p-6 border-b border-gray-100">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                    Order #{order.orderId}
                                                </h3>
                                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                                    <span className="flex items-center gap-1">
                                                        <FiCalendar className="w-4 h-4" />
                                                        {new Date(order.orderDate).toLocaleDateString('en-IN', {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric'
                                                        })}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <FiDollarSign className="w-4 h-4" />
                                                        Rs {order.totalAmount.toLocaleString('en-IN')}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <FiPackage className="w-4 h-4" />
                                                        {order.items.reduce((total, item) => total + item.quantity, 0)} items
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)} flex items-center gap-1`}>
                                                    {getStatusIcon(order.status)}
                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                                    <FiUser className="w-4 h-4 text-green-600" />
                                                    Shipping Information
                                                </h4>
                                                <div className="space-y-2 text-sm">
                                                    <p className="font-medium text-gray-900">{order.shippingDetails.name}</p>
                                                    <p className="text-gray-600">{order.shippingDetails.email}</p>
                                                    <p className="text-gray-600">{order.shippingDetails.mobile}</p>
                                                    <p className="text-gray-600 whitespace-pre-line">{order.shippingDetails.address}</p>
                                                    <p className="text-gray-600">Postal Code: {order.shippingDetails.postalCode}</p>
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                                    <FiPackage className="w-4 h-4 text-green-600" />
                                                    Ordered Items
                                                </h4>
                                                <div className="space-y-3">
                                                    {order.items.map((item) => (
                                                        <div key={item.productID} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                                                            <div className="w-12 h-12 bg-white rounded border overflow-hidden flex-shrink-0">
                                                                <img
                                                                    src={item.images?.[0] || "/placeholder-image.jpg"}
                                                                    alt={item.name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <h5 className="font-medium text-gray-900 text-sm mb-1">
                                                                    {item.name}
                                                                </h5>
                                                                <div className="flex justify-between items-center text-xs text-gray-600">
                                                                    <span>Qty: {item.quantity}</span>
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

                                        <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                            <div className="text-sm text-gray-600">
                                                <p>Need help with this order?</p>
                                                <p className="text-green-600 font-medium">Contact customer support</p>
                                            </div>
                                            <div className="flex gap-2">
                                                
                                                <button
                                                    onClick={() => navigate('/product')}
                                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                                                >
                                                    Order Again
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {orders.length > 0 && (
                        <div className="mt-8 text-center">
                            <p className="text-gray-600 text-sm">
                                Showing {orders.length} order{orders.length !== 1 ? 's' : ''} in total
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default OrdersPage;