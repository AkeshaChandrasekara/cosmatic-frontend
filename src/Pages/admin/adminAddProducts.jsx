import { useState } from "react";
import axios from "axios";
import mediaUpload from "../../../utils/mediaUpload";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

export default function AdminAddProduct({ isOpen, onClose, refresh }) {
    const [productId, setProductId] = useState("");
    const [name, setName] = useState("");
    const [altNames, setAltNames] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [price, setPrice] = useState("");
    const [labelledPrice, setLabelledPrice] = useState("");
    const [category, setCategory] = useState("cream");
    const [stock, setStock] = useState("");
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    async function handleSubmit(e) {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Session expired. Please login again.");
            return;
        }
        try {
            setLoading(true);

            const uploadPromises = Array.from(images).map((file) => mediaUpload(file));
            const urls = await Promise.all(uploadPromises);

            const product = {
                productID: productId,
                name,
                altNames: altNames.split(",").map((a) => a.trim()).filter(Boolean),
                description,
                images: urls,
                price: Number(price),
                labelledPrice: Number(labelledPrice),
                category,
                stock: Number(stock),
            };

            await axios.post(`${import.meta.env.VITE_API_URL}/api/products`, product, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success("Product added successfully");
            onClose();
            if (refresh) refresh();
        } catch (err) {
            console.error("Error adding product:", err);
            toast.error(err.response?.data?.message || "Failed to add product");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="relative bg-white w-[92%] lg:w-[65%] max-h-[90vh] overflow-y-auto shadow-xl">

                <div className="sticky top-0 bg-white border-b border-gray-200 flex items-center justify-between p-5">
                    <h2 className="text-lg md:text-xl font-semibold text-green-700">
                        Add New Product
                    </h2>
                    <button
                        onClick={onClose}
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
                                Images
                            </label>
                            <input
                                type="file"
                                multiple
                                onChange={(e) => setImages(e.target.files)}
                                className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none text-gray-900"
                            />
                            {images && images.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-3">
                                    {Array.from(images).map((file, idx) => (
                                        <img
                                            key={idx}
                                            src={URL.createObjectURL(file)}
                                            alt="preview"
                                            className="w-20 h-20 object-cover rounded-lg border"
                                        />
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
                            onClick={onClose}
                            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-green-900 text-white px-6 py-2 rounded-lg shadow hover:bg-green-800 transition disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Save Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}