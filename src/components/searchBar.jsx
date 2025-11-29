import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ placeholder = "Search products..." }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const apiUrl = `${import.meta.env.VITE_API_URL}/api/products`;
            const response = await axios.get(apiUrl);
            if (Array.isArray(response.data)) {
                setProducts(response.data);
            }
        } catch (error) {
            console.error("Error loading products for search:", error);
        }
    };

    const handleSearch = (searchQuery) => {
        setQuery(searchQuery);
        if (searchQuery.trim() === "") {
            setResults([]);
            setShowResults(false);
            return;
        }

        const filtered = products.filter(product =>
            product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        setResults(filtered.slice(0, 5));
        setShowResults(true);
    };

    const handleProductClick = (productID) => {
        setShowResults(false);
        setQuery("");
        navigate(`/product/${productID}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (results.length > 0) {
            handleProductClick(results[0].productID);
        }
    };

    return (
        <div className="relative max-w-xs md:max-w-sm w-full md:w-[350px]">
            <form onSubmit={handleSubmit} className="relative">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full border bg-gray-50 border-gray-50 text-black rounded-full pl-4 pr-10 py-2 text-sm focus:outline-none focus:border-white transition duration-200"
                />
                <FaSearch className="absolute right-3 top-2.5 text-green-600" size={16} />
            </form>

            {showResults && results.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-green-200 rounded-lg shadow-lg mt-1 z-50 max-h-60 overflow-y-auto">
                    {results.map((product) => (
                        <div
                            key={product.productID}
                            onClick={() => handleProductClick(product.productID)}
                            className="flex items-center gap-3 p-3 hover:bg-green-50 cursor-pointer border-b border-green-100 last:border-b-0"
                        >
                            <img
                                src={product.images?.[0] || "/placeholder-image.jpg"}
                                alt={product.name}
                                className="w-10 h-10 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-green-900 truncate">{product.name}</p>
                                <p className="text-xs text-green-600">Rs {product.price?.toLocaleString('en-IN')}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showResults && query && results.length === 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-green-200 rounded-lg shadow-lg mt-1 z-50 p-3">
                    <p className="text-sm text-green-600">No products found</p>
                </div>
            )}
        </div>
    );
}