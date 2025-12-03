import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/productCard";
import Footer from "../components/footer";
import { 
    FiStar, 
    FiUser, 
    FiDroplet, 
    FiSun,
    FiGrid
} from "react-icons/fi";

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState("loading");
    const [activeCategory, setActiveCategory] = useState("all");

    const categories = {
        'all': {
            name: 'All Products',
            description: 'Explore our complete range of organic cosmetics',
            icon: FiGrid,
            color: 'text-green-600'
        },
        'face-care': {
            name: 'Face Care',
            description: 'Nourish and rejuvenate your skin with our organic face products',
            subcategories: ['cream', 'moisturizer', 'serum'],
            icon: FiUser,
            color: 'text-blue-600'
        },
        'body-care': {
            name: 'Body Care',
            description: 'Pamper your body with natural hydration and luxurious care',
            subcategories: ['lotion'],
            icon: FiDroplet,
            color: 'text-purple-600'
        },
        'treatments': {
            name: 'Skin Treatments',
            description: 'Specialized treatments for targeted skin concerns and radiance',
            subcategories: ['mask'],
            icon: FiStar,
            color: 'text-pink-600'
        },
        'sun-protection': {
            name: 'Sun Protection',
            description: 'Advanced natural protection against harmful UV rays',
            subcategories: ['sunscreen', 'sunblock'],
            icon: FiSun,
            color: 'text-orange-600'
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = () => {
        setLoadingStatus("loading");
        
        const apiUrl = `${import.meta.env.VITE_API_URL}/api/products`;
        
        axios
            .get(apiUrl, {
                timeout: 10000,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setProducts(res.data);
                    setLoadingStatus("loaded");
                } else {
                    console.error("Expected array but got:", typeof res.data, res.data);
                    setProducts([]);
                    setLoadingStatus("error");
                }
            })
            .catch((err) => {
                console.error("Error loading products:", err);
                setProducts([]);
                setLoadingStatus("error");
            });
    };

    const getProductsByCategory = (categoryKey) => {
        if (categoryKey === "all") return products;
        
        const categoryConfig = categories[categoryKey];
        if (!categoryConfig) return [];
        
        return products.filter(product => 
            categoryConfig.subcategories.includes(product?.category)
        );
    };

    const getCategoryStats = () => {
        const stats = {};
        Object.keys(categories).forEach(key => {
            if (key !== 'all') {
                stats[key] = getProductsByCategory(key).length;
            }
        });
        return stats;
    };

    const categoryStats = getCategoryStats();

    const renderCategorySection = (categoryKey) => {
        const categoryProducts = getProductsByCategory(categoryKey);

        if (categoryProducts.length === 0) return null;

        return (
            <section key={categoryKey} className="mb-12 scroll-mt-20" id={categoryKey}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categoryProducts.map((product) => (
                        <ProductCard key={product?.productID} product={product} />
                    ))}
                </div>
            </section>
        );
    };

    const renderAllProductsView = () => {
        const allProducts = getProductsByCategory("all");
        
        return (
            <section className="mb-12">
                {allProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {allProducts.map((product) => (
                            <ProductCard key={product?.productID} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiGrid className="w-6 h-6 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">No Products Available</h3>
                        <p className="text-gray-600 text-sm">Check back soon for new arrivals.</p>
                    </div>
                )}
            </section>
        );
    };

    return (
        <div className="min-h-screen bg-white">
            
            <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <h1 className="text-lg font-bold text-gray-700 flex items-center gap-2">
                            <FiGrid className="w-5 h-5 text-green-600" />
                            Organic Cosmetics Collection
                        </h1>
                        
                        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-2">
                            {Object.keys(categories).map(key => {
                                const CategoryIcon = categories[key].icon;
                                return (
                                    <button
                                        key={key}
                                        onClick={() => {
                                            setActiveCategory(key);
                                            if (key === 'all') {
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            } else {
                                                setTimeout(() => {
                                                    document.getElementById(key)?.scrollIntoView({ 
                                                        behavior: 'smooth',
                                                        block: 'start'
                                                    });
                                                }, 100);
                                            }
                                        }}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                                            activeCategory === key
                                                ? 'bg-green-600 text-white shadow-md'
                                                : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                                        }`}
                                    >
                                        <CategoryIcon className={`w-4 h-4 ${activeCategory === key ? 'text-white' : categories[key].color}`} />
                                        <span>{categories[key].name}</span>
                                        {key !== 'all' && (
                                            <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                                                activeCategory === key 
                                                    ? 'bg-white text-green-600' 
                                                    : 'bg-green-100 text-green-700'
                                            }`}>
                                                {categoryStats[key] || 0}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loadingStatus === "loading" && (
                    <div className="flex flex-col items-center justify-center py-24">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mb-4"></div>
                    </div>
                )}

                {loadingStatus === "error" && (
                    <div className="text-center py-24">
                        <div className="max-w-md mx-auto">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiGrid className="w-6 h-6 text-red-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Unable to Load Products</h3>
                            <p className="text-gray-600 mb-6 text-sm">
                                We're having trouble loading our product collection. Please check your connection and try again.
                            </p>
                            <button
                                onClick={loadProducts}
                                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm shadow-md hover:shadow-lg"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                )}

                {loadingStatus === "loaded" && (
                    <div>
                        {activeCategory === "all" ? (
                            renderAllProductsView()
                        ) : (
                            <div>
                                {renderCategorySection(activeCategory)}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="mt-16">
                <Footer />
            </div>
        </div>
    );
}