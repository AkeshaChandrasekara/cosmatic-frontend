import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function AdminOrders() {
    const [search, setSearch] = useState("");

    const orders = [
        {
            orderId: "ORD001",
            name: "John Doe",
            email: "john@example.com",
            status: "preparing",
            phone: "1234567890",
            address: "123 Main St",
            date: "2025-08-27",
            total: 50,
        },
        {
            orderId: "ORD002",
            name: "Jane Smith",
            email: "jane@example.com",
            status: "delivered",
            phone: "0987654321",
            address: "456 Elm St",
            date: "2025-08-26",
            total: 80,
        },
    ];

    const filteredOrders = orders.filter(
        (order) =>
            order.orderId.toLowerCase().includes(search.toLowerCase()) ||
            order.name.toLowerCase().includes(search.toLowerCase()) ||
            order.email.toLowerCase().includes(search.toLowerCase()) ||
            order.status.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full min-h-screen bg-white">
            <div className="mx-auto max-w-7xl">

                <div className="border border-gray-200 bg-white shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between gap-4 border-b border-gray-200 px-6 py-4">
                        <h1 className="text-xl font-semibold text-green-900">Orders</h1>
                        <span className="px-3 py-1 text-xs font-medium text-green-900 bg-green-100 rounded-full">
                            {filteredOrders.length} orders
                        </span>
                    </div>


                    <div className="p-4">
                        <input
                            type="text"
                            placeholder="Search orders..."
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
                                            key={index}
                                            className="odd:bg-white even:bg-green-50 hover:bg-green-100 transition-colors"
                                        >
                                            <td className="px-4 py-3 font-mono text-sm text-gray-600">
                                                {order.orderId}
                                            </td>
                                            <td className="px-4 py-3 font-medium text-gray-800">
                                                {order.name}
                                            </td>
                                            <td className="px-4 py-3 text-gray-700">{order.email}</td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${order.status === "delivered"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                        }`}
                                                >
                                                    {order.status.charAt(0).toUpperCase() +
                                                        order.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-gray-800">{order.phone}</td>
                                            <td className="px-4 py-3 text-gray-800">{order.address}</td>
                                            <td className="px-4 py-3 text-gray-800">{order.date}</td>
                                            <td className="px-4 py-3 text-gray-800">${order.total}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-center gap-3">
                                                    <button
                                                        className="p-2 rounded-lg text-blue-600 ring-1 ring-gray-300 hover:bg-blue-100 hover:text-blue-800 transition"
                                                        title="Edit"
                                                    >
                                                        <FiEdit size={18} />
                                                    </button>
                                                    <button
                                                        className="p-2 rounded-lg text-red-600 ring-1 ring-gray-300 hover:bg-red-100 hover:text-red-800 transition"
                                                        title="Delete"
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
                                            No orders to display.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
