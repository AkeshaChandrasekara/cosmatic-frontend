import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Updated and slightly rearranged icons for better fit with the organic theme
import { FaUsers, FaLeaf, FaShoppingCart, FaDollarSign, FaBoxOpen, FaChartBar, FaSeedling, FaClipboardList } from "react-icons/fa";

export default function AdminView() {
    const navigate = useNavigate();
    const [productCount, setProductCount] = useState(0);
    const [customerCount, setCustomerCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const [adminName, setAdminName] = useState("");
    const [adminImage, setAdminImage] = useState("");

    // --- Data Definitions (Moved to top for clarity) ---

    const stats = [
        { icon: FaUsers, title: "Customers", value: customerCount, color: "emerald", unit: "" },
        { icon: FaShoppingCart, title: "Orders", value: orderCount, color: "teal", unit: "" },
        { icon: FaDollarSign, title: "Revenue", value: `$${revenue.toLocaleString()}`, color: "green", unit: "USD" },
        { icon: FaBoxOpen, title: "Products", value: productCount, color: "lime", unit: "" },
    ];

    const quickLinks = [
        { title: "Products", icon: FaSeedling, path: "/admin/products", color: "green" }, // Changed icon to FaSeedling
        { title: "Customers", icon: FaUsers, path: "/admin/customers", color: "purple" },
        { title: "Orders", icon: FaClipboardList, path: "/admin/orders", color: "teal" }, // Changed icon to FaClipboardList
        { title: "View Analytics", icon: FaChartBar, path: "/admin/dashboard", color: "emerald" }, // Changed icon to FaChartBar
    ];

    // Elegant and organic color palette using Tailwind's default colors
    const colorClasses = {
        emerald: { bg: "bg-emerald-50", text: "text-emerald-700", icon: "text-emerald-500", border: "border-emerald-300" },
        teal: { bg: "bg-teal-50", text: "text-teal-700", icon: "text-teal-500", border: "border-teal-300" },
        green: { bg: "bg-green-50", text: "text-green-700", icon: "text-green-500", border: "border-green-300" },
        lime: { bg: "bg-lime-50", text: "text-lime-700", icon: "text-lime-500", border: "border-lime-300" },
        purple: { bg: "bg-purple-50", text: "text-purple-700", icon: "text-purple-500", border: "border-purple-300" },
    };

    // --- Data Fetching Logic (Kept as-is) ---
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        let payload;
        try {
            payload = JSON.parse(atob(token.split(".")[1]));
        } catch (err) {
            console.error("Error decoding token", err);
            return;
        }

        const adminEmail = payload.email;

        const fetchCurrentAdmin = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users?email=${adminEmail}`);
                const currentAdmin = Array.isArray(res.data) ? res.data[0] : res.data;

                if (currentAdmin) {
                    setAdminName(`${currentAdmin.firstName} ${currentAdmin.lastName}`);
                    setAdminImage(currentAdmin.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
                }
            } catch (err) {
                console.error("Failed to fetch admin info", err);
            }
        };

        const fetchStats = async () => {
            try {
                const [productRes, userRes, orderRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`),
                    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users`),
                    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders`),
                ]);

                setProductCount(Array.isArray(productRes.data) ? productRes.data.length : 0);
                const customers = Array.isArray(userRes.data) ? userRes.data.filter(u => u.role === "user") : [];
                setCustomerCount(customers.length);
                setOrderCount(Array.isArray(orderRes.data) ? orderRes.data.length : 0);
                const totalRevenue = Array.isArray(orderRes.data) ? orderRes.data.reduce((acc, order) => acc + order.total, 0) : 0;
                setRevenue(totalRevenue);
            } catch (error) {
                console.error("Error fetching stats", error);
            }
        };

        fetchCurrentAdmin();
        fetchStats();
    }, []);

    // --- Rendered Component (Tailwind Enhancements) ---

    return (
        <div className="p-4 md:p-8 min-h-screen bg-white font-sans">
            <h1 className="text-2xl font-light text-gray-800 mb-6 border-b pb-2">Admin Dashboard</h1>

            {/* Welcome Banner: Clean and User-Friendly */}
            <div className="flex items-center gap-4 mb-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                <img
                    src={adminImage}
                    alt={adminName || "Admin"}
                    className="w-15 h-15 rounded-full object-cover border-4 border-green-300 shadow-md"
                />
                <div>

                    <h2 className="text-lg font-semibold text-green-700">{adminName || "Administrator"}</h2>
                    <p className="text-gray-500 text-sm mt-1">Ready to manage your organic cosmetics store?</p>

                </div>
            </div>

            <h2 className="text-xl font-bold text-gray-700 mb-5 uppercase">Metrics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {/* Stats Cards: Elegant and Insightful */}
                {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    const classes = colorClasses[stat.color];
                    return (
                        <div key={idx} className={`bg-white rounded-xl p-6 shadow-md border ${classes.border} hover:shadow-xl transform hover:-translate-y-1 transition duration-300`}>
                            <div className="flex justify-between items-center">
                                <h3 className={`${classes.text} font-medium text-sm uppercase tracking-wider`}>{stat.title}</h3>
                                <div className={`p-2 rounded-full ${classes.bg}`}>
                                    <Icon className={`${classes.icon} text-xl`} />
                                </div>
                            </div>
                            <p className="mt-3 text-4xl font-bold text-gray-900 leading-none">
                                {stat.value}
                            </p>
                            {stat.unit && <p className="text-sm text-gray-500 mt-1">{stat.unit}</p>}
                        </div>
                    );
                })}
            </div>

            <h2 className="text-xl font-bold text-gray-700 mb-5 uppercase">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Quick Links: Interactive and Clean */}
                {quickLinks.map((link, idx) => {
                    const Icon = link.icon;
                    const classes = colorClasses[link.color];
                    return (
                        <div
                            key={idx}
                            className={`bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-lg transition cursor-pointer flex items-center gap-4 hover:border-${link.color}-400 group`}
                            onClick={() => navigate(link.path)}
                        >
                            <div className={`p-3 rounded-full ${classes.bg}`}>
                                <Icon className={`${classes.icon} text-2xl group-hover:scale-110 transition`} />
                            </div>
                            <span className={`text-lg font-medium text-gray-700 group-hover:${classes.text}`}>{link.title}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}