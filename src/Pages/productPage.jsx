// src/pages/ProductPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/productCard";
import Footer from "../components/Footer";
import { 
    FiSearch, 
    FiX,
    FiFilter
} from "react-icons/fi";

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState("loading");
    const [query, setQuery] = useState("");
    const [sortBy, setSortBy] = useState("default");
    const [priceRange, setPriceRange] = useState("all");
    const [availability, setAvailability] = useState("all");
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = () => {
        setLoadingStatus("loading");
        axios
            .get(import.meta.env.VITE_API_URL +"api/products") 
            .then((res) => {
                console.log("API Response:", res.data);
              
                if (Array.isArray(res.data)) {
                    setProducts(res.data);
                } else {
                    console.error("Expected array but got:", typeof res.data, res.data);
                    setProducts([]);
                }
                setLoadingStatus("loaded");
            })
            .catch((err) => {
                console.error("Error loading products:", err);
                setProducts([]);
                setLoadingStatus("error");
            });
    };

    const searchProducts = (e) => {
        const searchQuery = e.target.value;
        setQuery(searchQuery);
        
        if (searchQuery === "") {
            loadProducts();
        } else {
            
            const filtered = Array.isArray(products) ? products.filter(product => 
                product && product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (product.altName && Array.isArray(product.altName) && 
                 product.altName.some(alt => alt && alt.toLowerCase().includes(searchQuery.toLowerCase())))
            ) : [];
            setProducts(filtered);
        }
    };

    const sortProducts = (productsToSort, sortType) => {
        if (!Array.isArray(productsToSort)) {
            return [];
        }
        
        const sortedProducts = [...productsToSort];
        
        switch (sortType) {
            case "price-low":
                return sortedProducts.sort((a, b) => (a?.price || 0) - (b?.price || 0));
            case "price-high":
                return sortedProducts.sort((a, b) => (b?.price || 0) - (a?.price || 0));
            case "name":
                return sortedProducts.sort((a, b) => (a?.name || '').localeCompare(b?.name || ''));
            case "discount":
                return sortedProducts.sort((a, b) => {
                    const discountA = a?.labelledPrice && a?.price ? ((a.labelledPrice - a.price) / a.labelledPrice) * 100 : 0;
                    const discountB = b?.labelledPrice && b?.price ? ((b.labelledPrice - b.price) / b.labelledPrice) * 100 : 0;
                    return discountB - discountA;
                });
            default:
                return sortedProducts;
        }
    };

    const filterProducts = (productsToFilter) => {
        if (!Array.isArray(productsToFilter)) {
            return [];
        }
        
        let filtered = productsToFilter;

        if (priceRange !== "all") {
            filtered = filtered.filter(product => {
                if (!product || typeof product.price !== 'number') return false;
                
                switch (priceRange) {
                    case "under-500":
                        return product.price < 500;
                    case "500-1000":
                        return product.price >= 500 && product.price <= 1000;
                    case "1000-2000":
                        return product.price > 1000 && product.price <= 2000;
                    case "above-2000":
                        return product.price > 2000;
                    default:
                        return true;
                }
            });
        }

        if (availability !== "all") {
            filtered = filtered.filter(product => {
                if (!product || typeof product.stock !== 'number') return false;
                
                switch (availability) {
                    case "in-stock":
                        return product.stock > 0;
                    case "out-of-stock":
                        return product.stock === 0;
                    default:
                        return true;
                }
            });
        }

        return filtered;
    };

    const clearFilters = () => {
        setPriceRange("all");
        setAvailability("all");
        setSortBy("default");
        setQuery("");
        loadProducts();
    };

    const filteredAndSortedProducts = (() => {
        try {
            const filtered = filterProducts(products);
            const sorted = sortProducts(filtered, sortBy);
            return Array.isArray(sorted) ? sorted : [];
        } catch (error) {
            console.error("Error in filtering/sorting:", error);
            return [];
        }
    })();

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
            <div className="max-w-7xl mx-auto p-6">
              
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Our Organic Products
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover our premium collection of organic cosmetics, carefully crafted for your natural beauty.
                    </p>
                </div>

                
                <div className="relative mb-8">
                    <div className="relative flex items-center bg-white rounded-2xl shadow-lg border border-green-100 p-0 transition-all duration-300 hover:shadow-xl hover:border-green-200 max-w-2xl mx-auto">
                        <div className="pl-5 pr-3">
                            <FiSearch className="w-5 h-5 text-green-500" />
                        </div>
                        <input
                            type="text"
                            className="w-full p-4 border-0 focus:ring-0 text-gray-700 placeholder-gray-400 text-lg bg-transparent"
                            placeholder="Search for organic products..."
                            onChange={searchProducts}
                            value={query}
                        />
                        {query && (
                            <button
                                onClick={() => setQuery("")}
                                className="pr-4 text-gray-400 hover:text-green-600 transition-colors duration-200"
                            >
                                <FiX className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>

                <div className="lg:hidden mb-4">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        <FiFilter className="w-4 h-4" />
                        Filters
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                 
                    <div className={`lg:w-80 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                        <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-5 lg:sticky lg:top-6 transition-all duration-300 hover:shadow-xl">
                           
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                                    FILTER PRODUCTS
                                </h3>
                                <button
                                    onClick={clearFilters}
                                    className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-sm"
                                >
                                    CLEAR
                                </button>
                            </div>

                            <div className="mb-6">
                                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Sort By</h4>
                                <div className="space-y-2">
                                    {[
                                        { value: "default", label: "Default" },
                                        { value: "price-low", label: "Price: Low to High" },
                                        { value: "price-high", label: "Price: High to Low" },
                                        { value: "name", label: "Name A-Z" },
                                        { value: "discount", label: "Best Discount" }
                                    ].map((option) => (
                                        <label key={option.value} className="flex items-center space-x-3 cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="sort"
                                                value={option.value}
                                                checked={sortBy === option.value}
                                                onChange={(e) => setSortBy(e.target.value)}
                                                className="text-green-600 focus:ring-green-500"
                                            />
                                            <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                                                {option.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Price Range</h4>
                                <div className="space-y-2">
                                    {[
                                        { value: "all", label: "All Prices" },
                                        { value: "under-500", label: "Under Rs 500" },
                                        { value: "500-1000", label: "Rs 500 - 1,000" },
                                        { value: "1000-2000", label: "Rs 1,000 - 2,000" },
                                        { value: "above-2000", label: "Above Rs 2,000" }
                                    ].map((option) => (
                                        <label key={option.value} className="flex items-center space-x-3 cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="price"
                                                value={option.value}
                                                checked={priceRange === option.value}
                                                onChange={(e) => setPriceRange(e.target.value)}
                                                className="text-green-600 focus:ring-green-500"
                                            />
                                            <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                                                {option.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-2">
                                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Availability</h4>
                                <div className="space-y-2">
                                    {[
                                        { value: "all", label: "All Products" },
                                        { value: "in-stock", label: "In Stock" },
                                        { value: "out-of-stock", label: "Out of Stock" }
                                    ].map((option) => (
                                        <label key={option.value} className="flex items-center space-x-3 cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="availability"
                                                value={option.value}
                                                checked={availability === option.value}
                                                onChange={(e) => setAvailability(e.target.value)}
                                                className="text-green-600 focus:ring-green-500"
                                            />
                                            <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                                                {option.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    
                    <div className="flex-1">
                        {loadingStatus === "loading" && (
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-green-600 mb-4"></div>
                                <p className="text-gray-600">Loading organic products...</p>
                            </div>
                        )}

                        {loadingStatus === "error" && (
                            <div className="text-center py-16">
                                <div className="max-w-md mx-auto">
                                    <div className="relative w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <FiX className="w-12 h-12 text-green-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-3">Error Loading Products</h3>
                                    <p className="text-gray-600 mb-6">Please try again later.</p>
                                    <button
                                        onClick={loadProducts}
                                        className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300"
                                    >
                                        Retry
                                    </button>
                                </div>
                            </div>
                        )}

                        {loadingStatus === "loaded" && (
                            <>
                                {Array.isArray(filteredAndSortedProducts) && filteredAndSortedProducts.length > 0 ? (
                                    <>
                                        <div className="mb-4 text-sm text-gray-600">
                                            Showing {filteredAndSortedProducts.length} products
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                            {filteredAndSortedProducts.map((product) => (
                                                <ProductCard key={product?.productID || Math.random()} product={product} />
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center py-16">
                                        <div className="max-w-md mx-auto">
                                            <div className="relative w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                                <FiSearch className="w-12 h-12 text-green-600" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-800 mb-3">No products found</h3>
                                            <p className="text-gray-600 mb-6">
                                                {query || priceRange !== "all" || availability !== "all" 
                                                    ? "No results match your filters. Try adjusting your search criteria." 
                                                    : 'No products available at the moment.'}
                                            </p>
                                            {(query || priceRange !== "all" || availability !== "all") && (
                                                <button
                                                    onClick={clearFilters}
                                                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300"
                                                >
                                                    Clear All Filters
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-16">
                <Footer />
            </div>
        </div>
    );
}