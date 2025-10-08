import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaChartLine, FaShoppingCart, FaLeaf, FaDollarSign, FaBoxOpen } from "react-icons/fa";

export default function AdminView() {
    const navigate = useNavigate();
    const [productCount, setProductCount] = useState(0);
    const [customerCount, setCustomerCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const [adminName, setAdminName] = useState("");
    const [adminImage, setAdminImage] = useState("");

    const stats = [
        { icon: FaUsers, title: "Users", value: customerCount, color: "green" },
        { icon: FaShoppingCart, title: "Orders", value: orderCount, color: "yellow" },
        { icon: FaDollarSign, title: "Revenue", value: `$${revenue}`, color: "teal" },
        { icon: FaBoxOpen, title: "Products", value: productCount, color: "purple" },
    ];

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

        fetchCurrentAdmin();


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

        fetchStats();
    }, []);

    const quickLinks = [
        { title: "Manage Products", icon: FaLeaf, path: "/admin/products", color: "teal" },
        { title: "Manage Users", icon: FaUsers, path: "/admin/customers", color: "purple" },
        { title: "Manage Orders", icon: FaShoppingCart, path: "/admin/orders", color: "yellow" },
        { title: "View Analytics", icon: FaChartLine, path: "/admin/dashboard", color: "green" },
    ];

    const colorClasses = {
        green: { bg: "bg-green-100", text: "text-green-700", icon: "text-green-600", title: "text-green-800" },
        yellow: { bg: "bg-yellow-100", text: "text-yellow-700", icon: "text-yellow-600", title: "text-yellow-800" },
        teal: { bg: "bg-teal-100", text: "text-teal-700", icon: "text-teal-600", title: "text-teal-800" },
        purple: { bg: "bg-purple-100", text: "text-purple-700", icon: "text-purple-600", title: "text-purple-800" },
    };

    return (
        <div className="p-6 min-h-screen bg-white border border-gray-400">

            <h1 className="text-3xl font-semibold text-green-900 mb-4">Dashboard</h1>

            <div className="flex items-center gap-4 mb-6 p-4 bg-green-100 rounded-xl shadow-md">
                <img
                    src={adminImage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                    alt={adminName || "Admin"}
                    className="w-16 h-16 rounded-full object-cover border-2 border-green-400"
                />
                <div>
                    <h2 className="text-xl font-semibold text-green-900">{adminName || "Administrator"}</h2>
                    <p className="text-green-700 text-sm">Administrator</p>
                </div>
            </div>



            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    const classes = colorClasses[stat.color];
                    return (
                        <div key={idx} className={`${classes.bg} rounded-xl p-6 shadow-md hover:shadow-xl transition flex flex-col items-start`}>
                            <Icon className={`${classes.icon} text-3xl mb-3`} />
                            <h3 className={`${classes.title} font-semibold text-lg`}>{stat.title}</h3>
                            <p className={`${classes.text} mt-1 text-xl font-bold`}>{stat.value}</p>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {quickLinks.map((link, idx) => {
                    const Icon = link.icon;
                    const classes = colorClasses[link.color];
                    return (
                        <div
                            key={idx}
                            className={`${classes.bg} rounded-xl p-6 shadow-md hover:shadow-lg transition flex items-center gap-4 cursor-pointer`}
                            onClick={() => navigate(link.path)}
                        >
                            <Icon className={`${classes.icon} text-3xl`} />
                            <span className={`${classes.title} font-semibold`}>{link.title}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
