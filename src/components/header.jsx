import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { LuUserRound } from "react-icons/lu";
import { BsCart2, BsClipboardCheck, BsHeart } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import SearchBar from "./searchBar";
import { loadCart, getCurrentUserEmail } from "../../utils/cartUtils";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [ordersCount, setOrdersCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [userFirstName, setUserFirstName] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const logoutRef = useRef(null);

    const sections = [
        { name: "Home", path: "/" },
        { name: "Products", path: "/product" },
        { name: "About Us", path: "/about" },
        { name: "Contact Us", path: "/contact" },
    ];

    useEffect(() => {
        updateCounts();
        checkUserLogin();
        
        const handleCartUpdate = () => {
            updateCounts();
        };
        
        const handleClickOutside = (event) => {
            if (logoutRef.current && !logoutRef.current.contains(event.target)) {
                setShowLogout(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        window.addEventListener('cartUpdated', handleCartUpdate);
        
        return () => {
            document.removeEventListener('click', handleClickOutside);
            window.removeEventListener('cartUpdated', handleCartUpdate);
        };
    }, []);

    const updateCounts = () => {
        const cart = loadCart();
        const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
        setCartCount(cartItemsCount);

        const email = getCurrentUserEmail();
        const wishlist = email ? JSON.parse(localStorage.getItem(`wishlist_${email}`) || '[]') : [];
        setWishlistCount(wishlist.length);

        const orders = email ? JSON.parse(localStorage.getItem(`orders_${email}`) || '[]') : [];
        setOrdersCount(orders.length);
    };

    const checkUserLogin = () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const payload = JSON.parse(atob(base64));
                setUserFirstName(payload.firstName || 'User');
                setIsLoggedIn(true);
            } catch (e) {
                setIsLoggedIn(false);
                setUserFirstName("");
            }
        } else {
            setIsLoggedIn(false);
            setUserFirstName("");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUserFirstName("");
        setShowLogout(false);
        setIsOpen(false);
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const handleUserClick = (e) => {
        e.stopPropagation();
        setShowLogout(!showLogout);
    };

    return (
        <header className="fixed top-0 w-full py-1 bg-green-900 shadow-sm z-50 ">
            <div className="w-full mx-auto flex items-center justify-between px-6 md:px-12 py-4">

                <Link to="/">
                    <img
                        src="/logo.png"
                        alt="Organic Cosmetics Logo"
                        className="h-10 md:h-12 w-[170px] md:w-[200px] object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                    />
                </Link>

                <nav className="hidden md:flex flex-1 items-center justify-between text-white font-sans">
                    <div className="flex-1 flex justify-center space-x-2 ml-35">
                        {sections.map((section) => (
                            <Link
                                key={section.name}
                                to={section.path}
                                className="px-3 py-2 text-sm font-semibold whitespace-nowrap uppercase hover:text-green-200 transition-colors duration-200"
                            >
                                {section.name.charAt(0).toUpperCase() + section.name.slice(1)}
                            </Link>
                        ))}
                    </div>

                    <div className=" flex justify-end  items-center space-x-6  pl-2">
                        <div className="hidden md:block">
                            <SearchBar />
                        </div>

                        <div className="flex items-center space-x-6">
                            <Link to="/orders" className="relative hover:text-white transition-colors duration-200">
                                <BsClipboardCheck size={20} />
                                <span className="absolute -top-2 -right-2 bg-white text-green-600 rounded-full text-xs w-4 h-4 flex items-center justify-center font-bold">
                                    {ordersCount}
                                </span>
                            </Link>
                            
                            <Link to="/wishlist" className="relative hover:text-white transition-colors duration-200">
                                <BsHeart size={20} />
                                <span className="absolute -top-2 -right-2 bg-white text-green-600 rounded-full text-xs w-4 h-4 flex items-center justify-center font-bold">
                                    {wishlistCount}
                                </span>
                            </Link>
                            
                            <Link to="/cart" className="relative hover:text-white transition-colors duration-200">
                                <BsCart2 size={20} />
                                <span className="absolute -top-2 -right-2 bg-white text-green-600 rounded-full text-xs w-4 h-4 flex items-center justify-center font-bold">
                                    {cartCount}
                                </span>
                            </Link>
                            
                            {isLoggedIn ? (
                                <div className="relative" ref={logoutRef}>
                                    <button 
                                        onClick={handleUserClick}
                                        className="flex items-center space-x-2 hover:text-green-200 transition-colors duration-200"
                                    >
                                        <span className="text-sm font-medium uppercase">
                                            Hi, {userFirstName.toUpperCase()}
                                        </span>
                                    </button>
                                    {showLogout && (
                                        <div className="absolute top-full right-0 mt-1 w-20 bg-white rounded-md shadow-lg py-1 z-50">
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-center px-3 py-1 text-xs text-gray-700 hover:bg-gray-100 transition-colors"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link to="/login" className="hover:text-white transition-colors duration-200">
                                    <LuUserRound size={20} />
                                </Link>
                            )}
                        </div>
                    </div>
                </nav>

                <button
                    className="md:hidden text-white hover:text-green-200 focus:outline-none"
                    onClick={() => setIsOpen(true)}
                >
                    <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            <div className="block md:hidden px-6 pb-3">
                <SearchBar />
            </div>

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
                        to="/orders"
                        className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-green-100 transition-colors font-medium relative"
                        onClick={() => setIsOpen(false)}
                    >
                        <div className="flex items-center">
                            <BsClipboardCheck className="mr-2" /> Orders
                        </div>
                        <span className="bg-white text-green-600 rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
                            {ordersCount}
                        </span>
                    </Link>

                    <Link
                        to="/wishlist"
                        className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-green-100 transition-colors font-medium relative"
                        onClick={() => setIsOpen(false)}
                    >
                        <div className="flex items-center">
                            <BsHeart className="mr-2" /> Wishlist
                        </div>
                        <span className="bg-white text-green-600 rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
                            {wishlistCount}
                        </span>
                    </Link>

                    <Link
                        to="/cart"
                        className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-green-100 transition-colors font-medium relative"
                        onClick={() => setIsOpen(false)}
                    >
                        <div className="flex items-center">
                            <BsCart2 className="mr-2" /> Cart
                        </div>
                        <span className="bg-white text-green-600 rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
                            {cartCount}
                        </span>
                    </Link>

                    {isLoggedIn ? (
                        <>
                            <div className="py-2 px-2 rounded-lg bg-green-100 font-medium">
                                <div className="flex items-center">
                                    <LuUserRound className="mr-2" /> 
                                    <span className="uppercase">Hi, {userFirstName.toUpperCase()}</span>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center py-1 px-2 rounded-lg hover:bg-green-100 transition-colors font-medium text-left w-full"
                            >
                                <span className="ml-7 text-sm">Logout</span>
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="flex items-center py-2 px-2 rounded-lg hover:bg-green-100 transition-colors font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            <LuUserRound className="mr-2" /> Login
                        </Link>
                    )}
                </nav>
            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-40"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}
        </header>
    );
}