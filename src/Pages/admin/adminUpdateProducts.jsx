import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import mediaUpload from "../../../utils/mediaUpload";
import toast from "react-hot-toast";
import { FaTimes, FaTrash } from "react-icons/fa";

export default function AdminUpdateProducts() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [productId, setProductId] = useState("");
    const [name, setName] = useState("");
    const [altNames, setAltNames] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [price, setPrice] = useState("");
    const [labelledPrice, setLabelledPrice] = useState("");
    const [category, setCategory] = useState("cream");
    const [stock, setStock] = useState("");
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const stateProduct = location.state;
        if (stateProduct) {
            fillForm(stateProduct);
        } else {
            fetchProduct();
        }
    }, [id, location.state]);

    function fillForm(product) {
        setProductId(product.productID);
        setName(product.name);
        setAltNames(product.altNames?.join(", ") || "");
        setDescription(product.description || "");
        setImages(product.images || []);
        setPrice(product.price);
        setLabelledPrice(product.labelledPrice);
        setCategory(product.category);
        setStock(product.stock);
    }

    async function fetchProduct() {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/products/${id}`
            );
            fillForm(data);
        } catch (err) {
            console.error("Error fetching product:", err);
            toast.error("Failed to load product");
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Session expired. Please login again.");
            navigate("/login");
            return;
        }
        try {
            setLoading(true);


            let uploadedUrls = [];
            if (newImages.length > 0) {
                const uploadPromises = Array.from(newImages).map((file) =>
                    mediaUpload(file)
                );
                uploadedUrls = await Promise.all(uploadPromises);
            }

            const updatedProduct = {
                productID: productId,
                name,
                altNames: altNames
                    .split(",")
                    .map((a) => a.trim())
                    .filter(Boolean),
                description,
                images: [...images, ...uploadedUrls],
                price: Number(price),
                labelledPrice: Number(labelledPrice),
                category,
                stock: Number(stock),
            };

            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/products/${id}`,
                updatedProduct,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            toast.success("Product updated successfully");
            navigate("/admin/products");
        } catch (err) {
            console.error("Error updating product:", err);
            toast.error(err.response?.data?.message || "Failed to update product");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <div className="relative bg-white w-[92%] lg:w-[65%] max-h-[90vh] overflow-y-auto shadow-xl ">

                <div className="sticky top-0 bg-white border-b border-gray-200 flex items-center justify-between p-5 z-10">
                    <h2 className="text-lg md:text-xl font-semibold text-green-700">
                        Update Product
                    </h2>
                    <button
                        onClick={() => navigate("/admin/products")}
                        className="p-2 text-gray-500 hover:text-green-700 rounded-full transition"
                    >
                        <FaTimes size={18} />
                    </button>
                </div>


                <form className="p-6 space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Product ID
                            </label>
                            <input
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                                required
                                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-gray-900"
                                placeholder="e.g., DS-CR-001"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Name
                            </label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-gray-900"
                                placeholder="Product name"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Alternative Names
                            </label>
                            <input
                                value={altNames}
                                onChange={(e) => setAltNames(e.target.value)}
                                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-gray-900"
                                placeholder="Comma separated names"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full min-h-[120px] border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-gray-900"
                                placeholder="Write a short description..."
                            />
                        </div>

                        
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Current Images
                            </label>
                            {images.length > 0 ? (
                                <div className="mt-3 flex flex-wrap gap-3">
                                    {images.map((url, idx) => (
                                        <div key={idx} className="relative group">
                                            <img
                                                src={url}
                                                alt="existing"
                                                className="w-20 h-20 object-cover rounded-lg border border-green-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setImages(images.filter((_, i) => i !== idx))}
                                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 shadow-lg hover:bg-red-700 transition cursor-pointer"
                                                title="Remove Image"
                                            >
                                                <FaTrash size={12} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">No images uploaded</p>
                            )}
                        </div>

                       
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Add New Images
                            </label>
                            <input
                                type="file"
                                multiple
                                onChange={(e) => setNewImages(e.target.files)}
                                className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none text-gray-900"
                            />
                            {newImages && newImages.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-3">
                                    {Array.from(newImages).map((file, idx) => (
                                        <div key={idx} className="relative group">
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt="preview"
                                                className="w-20 h-20 object-cover rounded-lg border border-green-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const updated = Array.from(newImages).filter((_, i) => i !== idx);
                                                    setNewImages(updated);
                                                }}
                                                className="absolute top-1 right-1 bg-green-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 shadow-lg hover:bg-red-700 transition cursor-pointer"
                                                title="Remove Image"
                                            >
                                                <FaTrash size={12} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Price
                            </label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-gray-900"
                                placeholder="0"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Labelled Price
                            </label>
                            <input
                                type="number"
                                value={labelledPrice}
                                onChange={(e) => setLabelledPrice(e.target.value)}
                                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-gray-900"
                                placeholder="0"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Category
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-gray-900"
                            >
                                <option value="cream">Cream</option>
                                <option value="lotion">Lotion</option>
                                <option value="serum">Serum</option>
                                <option value="mask">Mask</option>
                                <option value="moisturizer">Moisturizer</option>
                                <option value="sunscreen">Sunscreen</option>
                                <option value="sunblock">Sunblock</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Stock
                            </label>
                            <input
                                type="number"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-gray-900"
                                placeholder="0"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={() => navigate("/admin/products")}
                            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-green-900 text-white px-6 py-2 rounded-lg shadow hover:bg-green-800 transition disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Update Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}