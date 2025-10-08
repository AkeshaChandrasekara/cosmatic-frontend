import { useState } from "react";
import { Link } from "react-router-dom";
import { LuUserRound } from "react-icons/lu";
import { BsCart2 } from "react-icons/bs";
import { FaUser, FaShoppingCart, FaTimes } from "react-icons/fa";
import SearchBar from "./searchBar";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const sections = [
        { name: "Skin Care", path: "/skincare" },
        { name: "Sun Protection", path: "/sunprotection" },
        { name: "Make Up", path: "/makeup" },
        { name: "Brands", path: "/brands" },

    ];

    return (
        <header className="fixed top-0 w-full py-1 bg-white shadow-sm z-50 ">
            <div className="w-full mx-auto flex items-center justify-between px-6 md:px-12 py-4">

                {/* --- Logo --- */}
                <Link to="/">
                    <img
                        src="/logo.png"
                        alt="Organic Cosmetics Logo"
                        className="h-10 md:h-12 w-[170px] md:w-[200px] object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                    />
                </Link>



                {/* --- Navigation & Icons --- */}
                <nav className="hidden md:flex flex-1 items-center justify-between text-green-800 font-sans">
                    {/* --- Navigation (centered) --- */}
                    <div className="flex-1 flex justify-center space-x-2 ml-35">
                        {sections.map((section) => (
                            <Link
                                key={section.name}
                                to={section.path}
                                className="px-3 py-2 text-sm font-semibold whitespace-nowrap uppercase hover:text-green-600 transition-colors duration-200"
                            >
                                {section.name.charAt(0).toUpperCase() + section.name.slice(1)}
                            </Link>
                        ))}
                    </div>

                    {/* --- Search Bar (hidden on small screens) --- */}
                    <div className=" flex justify-end  items-center space-x-6  pl-2">
                        <div className="hidden md:block">
                            <SearchBar />
                        </div>

                        <div className="flex items-center space-x-4">
                            <Link to="/login" className="hover:text-green-900 transition-colors duration-200">
                                <LuUserRound size={20} />
                            </Link>
                            <Link to="/cart" className="relative hover:text-green-900 transition-colors duration-200">
                                <BsCart2 size={20} />
                                <span className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                                    3
                                </span>
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* --- Mobile Menu Button --- */}
                <button
                    className="md:hidden text-green-700 hover:text-green-900 focus:outline-none"
                    onClick={() => setIsOpen(true)}
                >
                    <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* --- Mobile Search Bar --- */}
            <div className="block md:hidden px-6 pb-3">
                <SearchBar />
            </div>

            {/* --- Mobile Menu --- */}
            <div
                className={`fixed top-0 right-0 h-full w-64 transform transition-transform duration-300 
                ${isOpen ? "translate-x-0" : "translate-x-full"} 
                bg-green-50 text-green-700 shadow-xl z-[10000] md:hidden`}
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-green-200">
                    <h2 className="text-lg font-semibold text-green-800">Menu</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-green-700 hover:text-green-900 transition-colors"
                    >
                        <FaTimes size={24} />
                    </button>
                </div>

                <nav className="flex flex-col space-y-3 px-6 py-6 bg-green-50 h-screen">
                    {sections.map((section) => (
                        <Link
                            key={section.name}
                            to={section.path}
                            className="py-2 px-2 rounded-lg hover:bg-green-100 transition-colors font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            {section.name.charAt(0).toUpperCase() + section.name.slice(1)}
                        </Link>
                    ))}

                    <Link
                        to="/login"
                        className="flex items-center py-2 px-2 rounded-lg hover:bg-green-100 transition-colors font-medium"
                        onClick={() => setIsOpen(false)}
                    >
                        <FaUser className="mr-2" /> Login
                    </Link>

                    <Link
                        to="/cart"
                        className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-green-100 transition-colors font-medium relative"
                        onClick={() => setIsOpen(false)}
                    >
                        <div className="flex items-center">
                            <FaShoppingCart className="mr-2" /> Cart
                        </div>
                        <span className="absolute -top-1 -right-2 bg-green-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                            3
                        </span>
                    </Link>
                </nav>
            </div>

            {/* --- Overlay --- */}
            {isOpen && (
                <div
                    className="fixed inset-0bg-opacity-30 z-40"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}
        </header>
    );
}
