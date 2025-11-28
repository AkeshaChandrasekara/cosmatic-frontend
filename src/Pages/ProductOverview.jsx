import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
    FiHeart, 
    FiShoppingCart, 
    FiArrowLeft, 
    FiTruck,
    FiShield,
    FiRotateCcw,
    FiChevronLeft,
    FiChevronRight,
    FiShare2,
    FiCreditCard,
} from "react-icons/fi";
import Footer from '../components/Footer';
import { addToCart, getCurrentUserEmail } from '../../utils/cartUtils';
import toast from 'react-hot-toast';

const ProductOverview = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [addingToCart, setAddingToCart] = useState(false);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const apiUrl = `${import.meta.env.VITE_API_URL}/api/products`;
            
            const response = await axios.get(apiUrl, {
                timeout: 10000,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            const allProducts = response.data;
            const foundProduct = allProducts.find(p => p.productID === id);
            
            if (foundProduct) {
                setProduct(foundProduct);
                setError(null);
            } else {
                setError('Product not found');
            }
        } catch (err) {
            setError('Product not found or failed to load');
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async () => {
        if (!product) return;
        
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please login to add items to cart');
            navigate('/login');
            return;
        }

        try {
            setAddingToCart(true);
            
            const productDetails = {
                name: product.name,
                price: product.price,
                labelledPrice: product.labelledPrice,
                images: product.images,
                category: product.category,
                stock: product.stock
            };
            
            const success = addToCart(product.productID, quantity, productDetails);
            
            if (success) {
               toast.success('Product added to cart successfully!');
            } else {
                toast.error('Failed to add product to cart');
            }
        } catch (error) {
            toast.error('Failed to add product to cart');
        } finally {
            setAddingToCart(false);
        }
    };

    const handleBuyNow = async () => {
        if (!product) return;
        
        const token = localStorage.getItem('token');
        if (!token) {
           toast.error('Please login to proceed with purchase');
            navigate('/login');
            return;
        }

        try {
            setAddingToCart(true);
            
            const productDetails = {
                name: product.name,
                price: product.price,
                labelledPrice: product.labelledPrice,
                images: product.images,
                category: product.category,
                stock: product.stock
            };
            
            const success = addToCart(product.productID, quantity, productDetails);
            
            if (success) {
                navigate('/cart');
            } else {
                toast.error('Failed to add product to cart');
            }
        } catch (error) {
            alert('Failed to add product to cart');
        } finally {
            setAddingToCart(false);
        }
    };

    const toggleWishlist = () => {
        console.log("Toggle wishlist:", product?.productID);
    };

    const handleQuantityChange = (change) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1 && newQuantity <= (product?.stock || 0)) {
            setQuantity(newQuantity);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
                    <div className="animate-pulse">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="h-4 bg-gray-200 rounded w-20"></div>
                            <div className="h-4 bg-gray-200 rounded w-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-32"></div>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <div className="aspect-square bg-gray-200 rounded-lg"></div>
                                <div className="grid grid-cols-4 gap-3">
                                    {[1,2,3,4].map(i => (
                                        <div key={i} className="aspect-square bg-gray-200 rounded"></div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                                <div className="h-20 bg-gray-200 rounded"></div>
                                <div className="h-12 bg-gray-200 rounded w-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiShoppingCart className="w-6 h-6 text-red-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Product Not Found</h2>
                    <p className="text-gray-600 mb-6">
                        {error || 'The product you are looking for does not exist.'}
                    </p>
                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={() => navigate(-1)}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Go Back
                        </button>
                        <Link
                            to="/product"
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Browse Products
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const isDiscounted = product.price < product.labelledPrice;
    const discountPercentage = isDiscounted
        ? Math.round(((product.labelledPrice - product.price) / product.labelledPrice) * 100)
        : 0;
    const isInStock = product.stock > 0;

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-gray-50 border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
                    <nav className="flex items-center gap-2 text-sm text-gray-600">
                        <Link to="/" className="hover:text-green-600 transition-colors">Home</Link>
                        <FiChevronRight className="w-4 h-4" />
                        <Link to="/product" className="hover:text-green-600 transition-colors">Products</Link>
                        <FiChevronRight className="w-4 h-4" />
                        <span className="text-gray-900 font-medium truncate">{product.name}</span>
                    </nav>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <div className="aspect-square bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <img
                                src={product.images[selectedImageIndex] || "/placeholder-image.jpg"}
                                alt={product.name}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.src = "/placeholder-image.jpg"; }}
                            />
                        </div>
                        {product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-3">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImageIndex(index)}
                                        className={`aspect-square rounded-lg border-2 overflow-hidden transition-all ${
                                            selectedImageIndex === index
                                                ? 'border-green-600 ring-1 ring-green-100'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <img src={image} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
                            <p className="text-xs text-gray-500 mb-3">Product ID: {product.productID}</p>
                            <div className="flex items-baseline gap-2 mb-3">
                                <span className="text-2xl font-bold text-gray-900">Rs {product.price?.toLocaleString('en-IN')}</span>
                                {isDiscounted && (
                                    <>
                                        <span className="text-xl text-red-600 font-bold line-through">Rs {product.labelledPrice?.toLocaleString('en-IN')}</span>
                                        <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">{discountPercentage}% OFF</span>
                                    </>
                                )}
                            </div>
                            {isDiscounted && (
                                <p className="text-md text-green-600 font-semibold">You save Rs {(product.labelledPrice - product.price).toLocaleString('en-IN')}</p>
                            )}
                        </div>

                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm ${
                            isInStock ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                        }`}>
                            <div className={`w-2 h-2 rounded-full ${isInStock ? 'bg-green-600' : 'bg-red-600'}`}></div>
                            <span className="font-medium">{isInStock ? `${product.stock} in stock` : 'Out of Stock'}</span>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                            <p className="text-gray-600 leading-relaxed text-sm text-justify">{product.description}</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-900">Quantity</label>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                    <button
                                        onClick={() => handleQuantityChange(-1)}
                                        disabled={quantity <= 1}
                                        className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <FiChevronLeft className="w-4 h-4" />
                                    </button>
                                    <span className="px-3 py-1 min-w-10 text-center font-medium text-sm">{quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(1)}
                                        disabled={quantity >= product.stock}
                                        className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <FiChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                                <span className="text-xs text-gray-500">{product.stock} available</span>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={handleAddToCart}
                                disabled={!isInStock || addingToCart}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold text-sm transition-all ${
                                    isInStock
                                        ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-md hover:shadow-lg'
                                        : 'bg-gray-300 cursor-not-allowed text-gray-500'
                                } ${addingToCart ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <FiShoppingCart className="w-4 h-4" />
                                {addingToCart ? 'Adding...' : (isInStock ? 'Add to Cart' : 'Out of Stock')}
                            </button>
                            
                            <button
                                onClick={handleBuyNow}
                                disabled={!isInStock || addingToCart}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold text-sm transition-all ${
                                    isInStock
                                        ? 'bg-gradient-to-r from-orange-600 to-orange-700 text-white hover:from-orange-700 hover:to-orange-800 shadow-md hover:shadow-lg'
                                        : 'bg-gray-300 cursor-not-allowed text-gray-500'
                                } ${addingToCart ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <FiCreditCard className="w-4 h-4" />
                                {addingToCart ? 'Adding...' : 'Buy Now'}
                            </button>

                            <button
                                onClick={toggleWishlist}
                                className="p-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <FiHeart className="w-4 h-4" />
                            </button>
                            
                            <button className="p-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                <FiShare2 className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-gray-200">
                            <div className="flex items-center gap-2">
                                <div className="p-1 bg-blue-50 rounded-lg"><FiTruck className="w-3 h-3 text-blue-600" /></div>
                                <div><p className="text-xs font-medium text-gray-900">Free Shipping</p><p className="text-xs text-gray-500">Above Rs 2000</p></div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="p-1 bg-green-50 rounded-lg"><FiRotateCcw className="w-3 h-3 text-green-600" /></div>
                                <div><p className="text-xs font-medium text-gray-900">Easy Returns</p><p className="text-xs text-gray-500">30 Day Policy</p></div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="p-1 bg-purple-50 rounded-lg"><FiShield className="w-3 h-3 text-purple-600" /></div>
                                <div><p className="text-xs font-medium text-gray-900">Quality Assured</p><p className="text-xs text-gray-500">100% Organic</p></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Product Details</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between py-2 border-b border-gray-100">
                                    <span className="text-sm text-gray-600">Category</span>
                                    <span className="font-medium text-gray-900 text-sm capitalize">{product.category}</span>
                                </div>
                                {product.subcategory && (
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-sm text-gray-600">Subcategory</span>
                                        <span className="font-medium text-gray-900 text-sm">{product.subcategory}</span>
                                    </div>
                                )}
                                <div className="flex justify-between py-2 border-b border-gray-100">
                                    <span className="text-sm text-gray-600">Stock Status</span>
                                    <span className={`font-medium text-sm ${isInStock ? 'text-green-600' : 'text-red-600'}`}>
                                        {isInStock ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </div>
                                {product.tags && product.tags.length > 0 && (
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-sm text-gray-600">Tags</span>
                                        <div className="flex flex-wrap gap-1">
                                            {product.tags.map((tag, index) => (
                                                <span key={index} className="px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Shipping & Returns</h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-2"><FiTruck className="w-4 h-4 text-green-600 mt-0.5" /><div><p className="font-medium text-gray-900 text-sm">Free Shipping</p><p className="text-gray-600 text-xs">Enjoy free shipping on orders above Rs 2000</p></div></div>
                                <div className="flex items-start gap-2"><FiRotateCcw className="w-4 h-4 text-green-600 mt-0.5" /><div><p className="font-medium text-gray-900 text-sm">Easy Returns</p><p className="text-gray-600 text-xs">30-day return policy for unused products</p></div></div>
                                <div className="flex items-start gap-2"><FiShield className="w-4 h-4 text-green-600 mt-0.5" /><div><p className="font-medium text-gray-900 text-sm">Quality Guarantee</p><p className="text-gray-600 text-xs">100% organic and cruelty-free products</p></div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProductOverview;