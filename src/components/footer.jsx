import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { GiHerbsBundle } from "react-icons/gi";
import { SiVisa, SiMastercard } from "react-icons/si";

export default function Footer() {
    return (
        <footer className="bg-[#f8f8f8] text-gray-800 py-12 border-t border-gray-300">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

                {/* --- Subscribe Section --- */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">
                        Sign up to receive updates & exclusive deals
                    </h3>
                    <p className="text-sm mb-4 text-gray-600">
                        Stay informed about our latest products and special promotions directly to your inbox.
                    </p>
                    <div className="flex">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="w-full border border-gray-300 rounded-l-md px-3 py-2 text-sm focus:outline-none focus:border-green-600"
                        />
                        <button className="bg-gray-800 text-white px-5 text-sm font-semibold rounded-r-md hover:bg-gray-900 transition">
                            SUBSCRIBE
                        </button>
                    </div>
                </div>

                {/* --- Information --- */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Information</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/how-to-order" className="hover:text-green-700">How to order</Link></li>
                        <li><Link to="/delivery" className="hover:text-green-700">Delivery</Link></li>
                        <li><Link to="/exchanges" className="hover:text-green-700">Exchanges</Link></li>
                        <li><Link to="/about" className="hover:text-green-700">About Us</Link></li>
                    </ul>
                </div>

                {/* --- Customer Service --- */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/terms" className="hover:text-green-700">Terms and conditions</Link></li>
                        <li><Link to="/privacy" className="hover:text-green-700">Privacy policy</Link></li>
                        <li><Link to="/contact" className="hover:text-green-700">Contact us</Link></li>
                    </ul>
                </div>

                {/* --- Contact --- */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                    <p className="text-sm text-gray-700 mb-2">T: +94 71 6615030</p>
                    <p className="text-sm text-gray-700 mb-6">E: inquiries@organiccosmetics.lk</p>

                    <div className="flex space-x-3 mb-6">
                        <a href="#" className="text-gray-700 hover:text-green-700"><FaInstagram size={18} /></a>
                        <a href="#" className="text-gray-700 hover:text-green-700"><FaFacebookF size={18} /></a>
                        <a href="#" className="text-gray-700 hover:text-green-700"><FaTwitter size={18} /></a>
                    </div>

                    {/* Payment Icons */}
                    <div className="flex space-x-3">
                        <SiVisa className="text-blue-700" size={28} />
                        <SiMastercard className="text-red-600" size={28} />
                    </div>
                </div>
            </div>

            {/* --- Bottom Bar --- */}
            <div className="mt-12 border-t border-gray-300 pt-4 text-center text-xs text-gray-600">
                © {new Date().getFullYear()} Organic Cosmetics. All Rights Reserved.{" "}
                <span className="inline-flex items-center gap-1">
                    Web Design by Thilakshana
                </span>
            </div>
        </footer>
    );
}
