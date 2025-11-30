import { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function AdminOrders() {
    const [search, setSearch] = useState("");
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = () => {
        setLoading(true);
        try {
           
            const allOrders = JSON.parse(localStorage.getItem('all_orders') || '[]');
            
            const formattedOrders = allOrders.map(order => ({
                orderId: order.orderId,
                name: order.shippingDetails?.name || 'N/A',
                email: order.shippingDetails?.email || order.userEmail || 'N/A',
                status: order.status || 'confirmed',
                phone: order.shippingDetails?.mobile || order.shippingDetails?.phone || 'N/A',
                address: order.shippingDetails?.address || 'N/A',
                date: new Date(order.orderDate).toISOString().split('T')[0],
                total: order.totalAmount || 0,
                originalData: order 
            }));

            setOrders(formattedOrders);
        } catch (error) {
            console.error('Error loading orders:', error);
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    const filteredOrders = orders.filter(
        (order) =>
            order.orderId.toLowerCase().includes(search.toLowerCase()) ||
            order.name.toLowerCase().includes(search.toLowerCase()) ||
            order.email.toLowerCase().includes(search.toLowerCase()) ||
            order.status.toLowerCase().includes(search.toLowerCase()) ||
            order.phone.toLowerCase().includes(search.toLowerCase())
    );

    const handleStatusUpdate = (orderId, newStatus) => {
        try {
           
            const allOrders = JSON.parse(localStorage.getItem('all_orders') || '[]');
            const updatedOrders = allOrders.map(order => 
                order.orderId === orderId 
                    ? { ...order, status: newStatus }
                    : order
            );
            localStorage.setItem('all_orders', JSON.stringify(updatedOrders));

            const orderToUpdate = allOrders.find(order => order.orderId === orderId);
            if (orderToUpdate && orderToUpdate.userEmail) {
                const userOrders = JSON.parse(localStorage.getItem(`orders_${orderToUpdate.userEmail}`) || '[]');
                const updatedUserOrders = userOrders.map(order =>
                    order.orderId === orderId
                        ? { ...order, status: newStatus }
                        : order
                );
                localStorage.setItem(`orders_${orderToUpdate.userEmail}`, JSON.stringify(updatedUserOrders));
            }

            loadOrders();
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const handleDeleteOrder = (orderId) => {
        if (window.confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
            try {
   
                const allOrders = JSON.parse(localStorage.getItem('all_orders') || '[]');
                const orderToDelete = allOrders.find(order => order.orderId === orderId);
                const updatedOrders = allOrders.filter(order => order.orderId !== orderId);
                localStorage.setItem('all_orders', JSON.stringify(updatedOrders));

                if (orderToDelete && orderToDelete.userEmail) {
                    const userOrders = JSON.parse(localStorage.getItem(`orders_${orderToDelete.userEmail}`) || '[]');
                    const updatedUserOrders = userOrders.filter(order => order.orderId !== orderId);
                    localStorage.setItem(`orders_${orderToDelete.userEmail}`, JSON.stringify(updatedUserOrders));
                }

               
                loadOrders();
            } catch (error) {
                console.error('Error deleting order:', error);
            }
        }
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            confirmed: { color: "bg-blue-100 text-blue-700", label: "Confirmed" },
            preparing: { color: "bg-yellow-100 text-yellow-700", label: "Preparing" },
            shipped: { color: "bg-purple-100 text-purple-700", label: "Shipped" },
            delivered: { color: "bg-green-100 text-green-700", label: "Delivered" },
            cancelled: { color: "bg-red-100 text-red-700", label: "Cancelled" }
        };

        const config = statusConfig[status] || statusConfig.confirmed;
        
        return (
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
                {config.label}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="w-full min-h-screen bg-white">
                <div className="mx-auto max-w-7xl p-6">
                    <div className="animate-pulse space-y-4">
                        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                        <div className="h-12 bg-gray-200 rounded w-1/2 mb-6"></div>
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-20 bg-gray-200 rounded w-full"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-white">
            <div className="mx-auto max-w-7xl">
            
                <div className="border border-gray-200 bg-white shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between gap-4 border-b border-gray-200 px-6 py-4">
                        <h1 className="text-xl font-semibold text-green-900">Orders</h1>
                        <div className="flex items-center gap-4">
                            <span className="px-3 py-1 text-xs font-medium text-green-900 bg-green-100 rounded-full">
                                {filteredOrders.length} orders
                            </span>
                            <button
                                onClick={loadOrders}
                                className="px-3 py-1 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                            >
                                Refresh
                            </button>
                        </div>
                    </div>

                    <div className="p-4">
                        <input
                            type="text"
                            placeholder="Search orders by ID, name, email, phone, or status..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1000px] text-left">
                            <thead className="bg-green-900 text-white">
                                <tr>
                                    {[
                                        "Order ID",
                                        "Name",
                                        "Email",
                                        "Status",
                                        "Phone",
                                        "Address",
                                        "Date",
                                        "Total",
                                        "Actions",
                                    ].map((header) => (
                                        <th
                                            key={header}
                                            className="px-4 py-3 text-xs font-semibold uppercase tracking-wide"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {filteredOrders.length > 0 ? (
                                    filteredOrders.map((order, index) => (
                                        <tr
                                            key={order.orderId}
                                            className="odd:bg-white even:bg-green-50 hover:bg-green-100 transition-colors"
                                        >
                                            <td className="px-4 py-3 font-mono text-xs text-gray-600">
                                                {order.orderId}
                                            </td>
                                            <td className="px-4 py-3 text-xs text-gray-800">
                                                {order.name}
                                            </td>
                                            <td className="px-4 py-3 text-xs text-gray-700">{order.email}</td>
                                            <td className="px-4 py-3">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusUpdate(order.orderId, e.target.value)}
                                                    className={`text-xs font-medium rounded-full px-2.5 py-1 border-0 focus:ring-2 focus:ring-green-400 outline-none ${
                                                        order.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                                                        order.status === 'preparing' ? 'bg-yellow-100 text-yellow-700' :
                                                        order.status === 'shipped' ? 'bg-purple-100 text-purple-700' :
                                                        order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                                        'bg-red-100 text-red-700'
                                                    }`}
                                                >
                                                    <option value="confirmed">Confirmed</option>
                                                    <option value="preparing">Preparing</option>
                                                    <option value="shipped">Shipped</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </td>
                                            <td className="px-4 py-3 text-xs text-gray-800">{order.phone}</td>
                                            <td className="px-4 py-3 text-xs text-gray-800 max-w-xs truncate" title={order.address}>
                                                {order.address}
                                            </td>
                                            <td className="px-4 py-3 text-xs text-gray-800">{order.date}</td>
                                            <td className="px-4 py-3 text-xs text-gray-800">
                                                Rs {order.total.toLocaleString('en-IN')}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-center gap-3">
                                                    <button
                                                        className="p-2 rounded-lg text-blue-600 ring-1 ring-gray-300 hover:bg-blue-100 hover:text-blue-800 transition"
                                                        title="Edit"
                                                        onClick={() => {
                                                         
                                                            const orderDetails = orders.find(o => o.orderId === order.orderId);
                                                            console.log('Edit order:', orderDetails);
                                                        }}
                                                    >
                                                        <FiEdit size={18} />
                                                    </button>
                                                    <button
                                                        className="p-2 rounded-lg text-red-600 ring-1 ring-gray-300 hover:bg-red-100 hover:text-red-800 transition"
                                                        title="Delete"
                                                        onClick={() => handleDeleteOrder(order.orderId)}
                                                    >
                                                        <RiDeleteBin6Line size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="9"
                                            className="px-4 py-12 text-center text-gray-500"
                                        >
                                            {orders.length === 0 ? 'No orders found in the system.' : 'No orders match your search.'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {filteredOrders.length > 0 && (
                        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                                <div>
                                    <span className="font-medium">Total Orders: </span>
                                    {orders.length}
                                </div>
                                <div>
                                    <span className="font-medium">Filtered: </span>
                                    {filteredOrders.length}
                                </div>
                                <div>
                                    <span className="font-medium">Total Revenue: </span>
                                    Rs {orders.reduce((sum, order) => sum + order.total, 0).toLocaleString('en-IN')}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}