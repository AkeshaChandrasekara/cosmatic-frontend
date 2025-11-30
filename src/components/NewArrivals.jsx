import { useState, useEffect } from 'react';
import ProductCard from './productCard';
import { FiClock, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function NewArrivals() {
    const [newProducts, setNewProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNewArrivals();
    }, []);

    const fetchNewArrivals = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
            const products = await response.json();
            // Sort by creation date and take latest 6 products
            const sortedProducts = products
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 6);
            setNewProducts(sortedProducts);
        } catch (error) {
            console.error('Error fetching new arrivals:', error);
            setNewProducts([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center gap-3 mb-4">
                    <FiClock className="w-6 h-6 text-green-600" />
                    <h2 className="text-3xl font-bold text-gray-900">New Arrivals</h2>
                </div>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Discover our latest additions to the organic cosmetics collection
                </p>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="animate-pulse">
                            <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-6 bg-gray-200 rounded"></div>
                        </div>
                    ))}
                </div>
            ) : newProducts.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {newProducts.map((product) => (
                            <ProductCard key={product.productID} product={product} />
                        ))}
                    </div>
                    
                    <div className="text-center">
                        <Link
                            to="/product"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                        >
                            View All New Arrivals
                            <FiArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </>
            ) : (
                <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FiClock className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">No New Arrivals</h3>
                    <p className="text-gray-600 mb-6">New products coming soon!</p>
                </div>
            )}
        </div>
    );
}