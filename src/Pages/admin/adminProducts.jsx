import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";
import { FaTimes, FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AdminAddProducts from "./adminAddProducts";
import { Loader } from "../../components/loader";


function ProductDeleteConfirm({ productID, close, refresh }) {
    function deleteProduct() {
        const token = localStorage.getItem("token");
        axios
            .delete(import.meta.env.VITE_API_URL + "/api/products/" + productID, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                toast.success("Product deleted successfully");
                close();
                refresh();
            })
            .catch(() => {
                toast.error("Failed to delete product");
            });
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex justify-center items-center px-4">
            <div className="bg-white rounded-xl shadow-2xl relative max-w-sm w-full p-8 flex flex-col items-center gap-6 animate-fadeIn border-t-4 border-red-500">

                <button
                    onClick={close}
                    className="absolute -top-3 cursor-pointer -right-3 w-10 h-10 bg-gray-200 rounded-full text-gray-700 flex justify-center items-center text-lg shadow-md hover:bg-red-500 hover:text-white transition-colors"
                    title="Close"
                >
                    <FaTimes />
                </button>

                <FaExclamationTriangle className="text-yellow-500 text-5xl" />

                <p className="text-center text-gray-800 font-medium text-lg">
                    Are you sure you want to delete product ID: <span className="font-bold text-red-600">{productID}</span>?
                </p>

                <div className="flex gap-4 w-full justify-center mt-2">
                    <button
                        onClick={close}
                        className="px-6 py-2 w-1/2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors shadow-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={deleteProduct}
                        className="px-6 py-2 w-1/2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors shadow-md"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}


export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (isLoading) {
            axios
                .get(import.meta.env.VITE_API_URL + "/api/products")
                .then((res) => {
                    setProducts(res.data);
                    setIsLoading(false);
                })
                .catch(() => {
                    toast.error("Failed to fetch products");
                    setIsLoading(false);
                });
        }
    }, [isLoading]);

    const filteredProducts = products.filter(
        (product) =>
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.description.toLowerCase().includes(search.toLowerCase()) ||
            product.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <div className="w-full min-h-screen bg-gray-50 text-gray-800   ">

                {isDeleteConfirmVisible && (
                    <ProductDeleteConfirm
                        productID={productToDelete}
                        close={() => setIsDeleteConfirmVisible(false)}
                        refresh={() => setIsLoading(true)}
                    />
                )}

                <div className="mx-auto max-w-full">

                    <div className=" shadow-xl rounded-lg border border-gray-200 overflow-hidden">

                        {/* Header/Title Row */}
                        <div className="flex items-center justify-between gap-4 border-b border-gray-200 px-6 py-3">
                            <h1 className="text-xl font-semibold text-green-700 uppercase">
                                Product Inventory
                            </h1>
                            <span className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full border border-green-200">
                                {filteredProducts.length} Items
                            </span>
                        </div>

                        {/* Search Bar */}
                        <div className="p-5 border-b border-gray-200">
                            <input
                                type="text"
                                placeholder="Search by name, description, or category..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-1/2 px-4 py-2 bg-white border border-gray-300 text-sm text-gray-800 rounded-lg focus:ring-2 focus:ring-green-400 outline-none placeholder-gray-500 transition"
                            />
                        </div>

                        {/* Products Table */}
                        <table className="w-full min-w-[1000px] text-left text-sm">
                            <thead className="bg-green-800 text-white text-xs uppercase">
                                <tr>
                                    <th className="px-5 py-3 font-semibold tracking-wider">Image</th>
                                    <th className="px-5 py-3 font-semibold tracking-wider">PID</th>
                                    <th className="px-5 py-3 font-semibold tracking-wider">Name</th>
                                    <th className="px-5 py-3 font-semibold tracking-wider">Price</th>
                                    <th className="px-5 py-3 font-semibold tracking-wider">Stock</th>
                                    <th className="px-5 py-3 font-semibold tracking-wider">Category</th>
                                    <th className="px-5 py-3 font-semibold tracking-wider text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {filteredProducts.map((item) => (
                                    <tr key={item.productID} className="odd:bg-white even:bg-green-50 hover:bg-green-100/70 transition-colors">
                                        <td className="px-5 py-3">
                                            <img
                                                src={item.images?.[0]}
                                                alt={item.name}
                                                className="h-12 w-12 border-3 border-green-100 object-cover rounded-md ring-1 ring-gray-300 shadow-sm"
                                            />
                                        </td>
                                        <td className="px-5 py-3 font-mono text-xs text-gray-600">{item.productID}</td>
                                        <td className="px-5 py-3 font-medium text-gray-800">{item.name}</td>
                                        <td className="px-5 py-3">
                                            <span className="rounded-full bg-green-100 px-3 py-0.5 text-xs font-medium text-green-700 border border-green-300">
                                                LKR {item.price.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3">
                                            <span className="rounded-full bg-gray-200 px-3 py-0.5 text-xs text-gray-700">
                                                {item.stock}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3">
                                            <span className="rounded-full bg-teal-100 px-3 py-0.5 text-xs font-medium text-teal-700 border border-teal-300">
                                                {item.category}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3">
                                            <div className="flex items-center justify-center gap-2">
                                                <FaRegTrashCan
                                                    className="cursor-pointer text-gray-500 hover:text-red-600 hover:bg-red-50 transition rounded-md p-1 ring-1 ring-gray-300 hover:ring-red-300"
                                                    size={25}
                                                    title="Delete"
                                                    onClick={() => {
                                                        setProductToDelete(item.productID);
                                                        setIsDeleteConfirmVisible(true);
                                                    }}
                                                />
                                                <FaRegEdit
                                                    className="cursor-pointer text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition rounded-md p-1 ring-1 ring-gray-300 hover:ring-blue-300"
                                                    size={25}
                                                    title="Edit"
                                                    onClick={() =>
                                                        navigate(`/admin/update-product/${item.productID}`, { state: item })
                                                    }
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>


                    </div>
                </div>
            </div>

            {/* Floating Add Button */}
            <button
                onClick={() => setIsAddOpen(true)}
                aria-label="Add New Product"
                title="Add New Product"
                className="fixed right-8 bottom-8 p-4 rounded-full bg-green-500 text-white shadow-xl hover:bg-green-600 transition duration-300 transform hover:scale-110 ring-4 ring-green-300/50"
            >
                <FaPlusCircle size={24} />
            </button>

            <AdminAddProducts
                isOpen={isAddOpen}
                onClose={() => setIsAddOpen(false)}
                refresh={() => setIsLoading(true)}
            />
        </>
    );
}
