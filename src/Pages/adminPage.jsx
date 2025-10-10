import { useState } from "react";
import { FaSignOutAlt, FaUsers, FaChartLine, FaShoppingCart, FaSeedling, FaBars, FaTimes, FaUserShield, FaSpa } from "react-icons/fa";
import { Link, Routes, Route, useLocation, useNavigate } from "react-router-dom";

import AdminCustomers from "./admin/adminCustomers";
import AdminProducts from "./admin/adminProducts";
import AdminOrders from "./admin/adminOrders";
import AdminView from "./admin/adminView";
import AdminAddProducts from "./admin/adminAddProducts";
import AdminAddCustomer from "./admin/adminAddCustomer";
import AdminUpdateProducts from "./admin/adminUpdateProducts";
import AdminTable from "./admin/adminTable";
import AdminUpdate from "./admin/adminUpdate";

export default function AdminPage() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();


    const menuItems = [
        { name: "Dashboard", icon: <FaChartLine />, path: "/admin/dashboard" },
        { name: "Products", icon: <FaSeedling />, path: "/admin/products" },
        { name: "Orders", icon: <FaShoppingCart />, path: "/admin/orders" },
        { name: "Customers", icon: <FaUsers />, path: "/admin/customers" },
        { name: "Admins", icon: <FaUserShield />, path: "/admin/admins" },
    ];

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        sessionStorage.clear();
        setIsOpen(false);
        navigate("/login");
    };

    return (

        <div className="flex min-h-screen ">

            {/* Mobile Menu Button - High contrast for visibility */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-3 bg-green-500 text-white rounded-lg shadow-xl hover:bg-green-600 transition duration-300 ring-2 ring-gray-700"
                >
                    {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </button>
            </div>

            {/* Sidebar - Dark, elegant theme with green accent */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-gray-800 shadow-2xl p-6 z-40
                transform transition-transform duration-300
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0 md:w-64 flex flex-col border-r border-green-700`}
            >

                {/* Logo/Brand Header */}
                <header className="flex flex-col items-center justify-center w-full h-32 mb-6 border-b border-gray-700">
                    <Link to="/admin/dashboard" className="text-center">


                        <h1 className="text-2xl font-bold text-white mt-2">Organic Admin</h1>
                        <p className="text-sm text-green-400">Premium Control Panel</p>
                    </Link>
                </header>

                <main className="flex flex-col flex-1">
                    {/* Navigation Links */}
                    <nav className="flex flex-col gap-2 flex-1">
                        {menuItems.map((item) => {
                            const active = location.pathname.startsWith(item.path);
                            return (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`flex items-center gap-4 p-3 rounded-xl font-medium transition-all duration-300 uppercase
                                        ${active

                                            ? "bg-green-700 text-white shadow-lg text-sm font-semibold"

                                            : "text-gray-300 text-sm hover:bg-gray-700 hover:text-white"
                                        }`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span className="text-md">{item.icon}</span>
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>


                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 p-3 mt-8 cursor-pointer bg-gray-700 text-gray-200 hover:bg-red-600 hover:text-white transition duration-300 justify-center font-medium w-full rounded-xl border border-gray-600"
                    >
                        <FaSignOutAlt /> Sign Out
                    </button>
                </main>
            </aside>

            {/* Main Content Area - Dark background for content */}
            <div className="flex-1 w-full md:pl-64  ">

                <div className="w-full h-full overflow-y-auto  sm:p-6   text-gray-100">
                    <Routes>
                        <Route path="/" element={<AdminView />} />
                        <Route path="/dashboard" element={<AdminView />} />
                        <Route path="/customers" element={<AdminCustomers />} />
                        <Route path="/admins" element={<AdminTable />} />
                        <Route path="/orders" element={<AdminOrders />} />
                        <Route path="/update-admin/:id" element={<AdminUpdate />} />
                        <Route path="/add-product" element={<AdminAddProducts />} />
                        <Route path="/add-customer" element={<AdminAddCustomer />} />
                        <Route path="/update-product/:id" element={<AdminUpdateProducts />} />
                        <Route path="/products" element={<AdminProducts />} />
                    </Routes>
                </div>
            </div>

        </div>
    );
}