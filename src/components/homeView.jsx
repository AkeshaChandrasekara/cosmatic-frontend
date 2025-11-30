import { FaWhatsapp, FaFacebookMessenger, FaTelegramPlane, FaStar, FaArrowRight, FaLeaf, FaRecycle, FaHeart, FaShieldAlt } from "react-icons/fa";
import Footer from "./Footer";
import Banner from "./banner";
import HomeShowcase from "./homeShowcase";
import InstagramFeed from "./instagramFeed";
import ProductCard from "../components/productCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function HomeView() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const apiUrl = `${import.meta.env.VITE_API_URL}/api/products`;
            const response = await axios.get(apiUrl, {
                timeout: 10000,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            if (Array.isArray(response.data)) {
                setProducts(response.data);
            } else {
                setProducts([]);
            }
        } catch (error) {
            console.error("Error loading products:", error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const trendingProducts = products.slice(0, 4);
    
    const collectionProducts = products.slice(4, 8);

    return (
        <div className="bg-white">
       
            <section className="bg-gray-50">
                <Banner />
            </section>

            
           
            <section className="bg-white">
                <HomeShowcase />
            </section>

            <section className="py-0">
                <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <img 
                            src="banner_pic1.png" 
                            alt="Organic Beauty Collection" 
                            className="w-full h-74 md:h-100 object-cover"
                        />
                    </div>
                </div>
            </section>

            <section className="bg-white py-16 border-b border-gray-100 mt-0">
                <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-medium text-gray-700 mb-3">
                            TRENDING COLLECTION
                        </h2>
                        <p className="text-md text-gray-600 max-w-2xl mx-auto">
                            Discover our most loved organic beauty essentials
                        </p>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[...Array(4)].map((_, index) => (
                                <div key={index} className="animate-pulse">
                                    <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
                                    <div className="bg-gray-200 h-4 rounded mb-2"></div>
                                    <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                                </div>
                            ))}
                        </div>
                    ) : trendingProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {trendingProducts.map((product) => (
                                <ProductCard key={product.productID} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaStar className="w-6 h-6 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">No Trending Products</h3>
                            <p className="text-gray-600">Check back soon for new arrivals.</p>
                        </div>
                    )}

                   <div className="text-center mt-12">
    <Link
        to="/product"
        className="inline-flex items-center gap-2 bg-transparent border-2 border-green-700 
         text-green-700 font-semibold py-3 px-8 rounded-lg transition-all duration-300 
         shadow-md hover:shadow-lg hover:transform hover:-translate-y-0.5
         hover:bg-green-600 hover:text-white"
    >
        VIEW ALL PRODUCTS
    </Link>
</div>
                </div>
            </section>

            <section className="py-8">
                <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <img 
                            src="banner8.png"
                            alt="Natural Skincare Routine" 
                            className="w-full h-64 md:h-100 object-cover"
                        />
                    </div>
                </div>
            </section>

            <section className="bg-white py-12 border-b border-gray-100">
                <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-medium text-gray-700 mb-3">
                           PRODUCTS MAY YOU LIKE
                        </h2>
                        <p className="text-md text-gray-600 max-w-2xl mx-auto">
                            Curated selection of premium organic beauty products
                        </p>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[...Array(4)].map((_, index) => (
                                <div key={index} className="animate-pulse">
                                    <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
                                    <div className="bg-gray-200 h-4 rounded mb-2"></div>
                                    <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                                </div>
                            ))}
                        </div>
                    ) : collectionProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {collectionProducts.map((product) => (
                                <ProductCard key={product.productID} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaStar className="w-6 h-6 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Collection Coming Soon</h3>
                            <p className="text-gray-600">We're preparing amazing products for you.</p>
                        </div>
                    )}
                                    <div className="text-center mt-12">
    <Link
        to="/product"
        className="inline-flex items-center gap-2 bg-transparent border-2 border-green-700 
         text-green-700 font-semibold py-3 px-8 rounded-lg transition-all duration-300 
         shadow-md hover:shadow-lg hover:transform hover:-translate-y-0.5
         hover:bg-green-600 hover:text-white"
    >
        VIEW ALL PRODUCTS
    </Link>
</div>
                </div>
            </section>

            <section className="bg-green-50 py-16">
                <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="text-left">
                            <h2 className="text-4xl font-bold text-gray-700 mb-6">
                                Transform Your Skin with Nature's Finest
                            </h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Experience the power of pure, organic ingredients carefully selected for their 
                                natural benefits. Our products are crafted to deliver visible results while 
                                respecting your skin and the environment.
                            </p>
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                    <span className="text-gray-700">Chemical-free formulations</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                    <span className="text-gray-700">Sustainable & ethical sourcing</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                    <span className="text-gray-700">Proven effectiveness</span>
                                </div>
                            </div>
                            <Link
                                to="/product"
                                className="inline-flex items-center gap-3 bg-green-700 hover:bg-green-800 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:transform hover:-translate-y-0.5"
                            >
                                Start Your Journey
                               
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="rounded-2xl overflow-hidden shadow-2xl">
                                <img 
                                    src="cosmatic-whomen.jpg" 
                                    alt="Natural Beauty Products" 
                                    className="w-full h-96 object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-green-50 rounded-full flex items-center justify-center shadow-lg">
                                <FaLeaf className="w-10 h-10 text-green-700" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

<section className="bg-white py-14 border-b border-gray-100">
                <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center group hover:transform hover:-translate-y-1 transition-all duration-300">
                            <div className="w-18 h-18 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-100 transition-colors">
                                <FaLeaf className="w-8 h-8 text-green-600" />
                            </div>
                            <p className="text-md font-medium text-gray-700">100% Natural organic ingredients</p>
                        </div>
                        
                        <div className="text-center group hover:transform hover:-translate-y-1 transition-all duration-300">
                            <div className="w-18 h-18 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-100 transition-colors">
                                <FaRecycle className="w-8 h-8 text-green-600" />
                            </div>
                            <p className="text-md font-medium text-gray-700">Eco-friendly sustainable packaging</p>
                        </div>
                        
                        <div className="text-center group hover:transform hover:-translate-y-1 transition-all duration-300">
                            <div className="w-18 h-18 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-100 transition-colors">
                                <FaHeart className="w-8 h-8 text-green-600" />
                            </div>
                            <p className="text-md font-medium text-gray-700">Cruelty-free & dermatologist tested</p>
                        </div>
                        
                        <div className="text-center group hover:transform hover:-translate-y-1 transition-all duration-300">
                            <div className="w-18 h-18 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-100 transition-colors">
                                <FaShieldAlt className="w-8 h-8 text-green-600" />
                            </div>
                            <p className="text-md font-medium text-gray-700">Visible results guaranteed</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 py-16">
                <InstagramFeed />
            </section>

            <Footer />

            <div className="fixed w-[50px] h-[140px] bg-green-800 bottom-1/4 right-0 flex flex-col items-center justify-around py-3 z-50 shadow-lg rounded-l-lg">
                <a
                    href="https://wa.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-2xl hover:scale-110 transition-transform"
                >
                    <FaWhatsapp />
                </a>

                <a
                    href="https://m.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-2xl hover:scale-110 transition-transform"
                >
                    <FaFacebookMessenger />
                </a>

                <a
                    href="https://t.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-2xl hover:scale-110 transition-transform"
                >
                    <FaTelegramPlane />
                </a>
            </div>
        </div>
    );
}