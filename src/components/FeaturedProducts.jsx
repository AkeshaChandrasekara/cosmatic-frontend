import { useState, useEffect } from 'react';
import ProductCard from './productCard';
import { FiStar, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function FeaturedProducts() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeaturedProducts();
    }, []);

    const fetchFeaturedProducts = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
            const products = await response.json();
            // Get featured products or first 8 products if no featured flag
            const featured = products.filter(product => product.featured).slice(0, 8);
            setFeaturedProducts(featured);
        } catch (error) {
            console.error('Error fetching featured products:', error);
            setFeaturedProducts([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-12 h-0.5 bg-green-600"></div>
                    <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
                    <div className="w-12 h-0.5 bg-green-600"></div>
                </div>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Discover our carefully curated selection of premium organic cosmetics
                </p>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                        <div key={i} className="animate-pulse">
                            <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-6 bg-gray-200 rounded"></div>
                        </div>
                    ))}
                </div>
            ) : featuredProducts.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.productID} product={product} />
                        ))}
                    </div>
                    
                    <div className="text-center">
                        <Link
                            to="/product"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white border border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all duration-300 font-semibold shadow-sm hover:shadow-md"
                        >
                            Explore All Products
                            <FiArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </>
            ) : (
                <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FiStar className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">No Featured Products</h3>
                    <p className="text-gray-600 mb-6">Check back soon for featured products.</p>
                    <Link
                        to="/product"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                    >
                        Browse All Products
                    </Link>
                </div>
            )}
        </div>
    );
}