import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { CiCirclePlus } from "react-icons/ci";
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
            <div className="bg-green-50 shadow-2xl relative max-w-sm w-full p-6 flex flex-col items-center gap-6 animate-fadeIn">

                <button
                    onClick={close}
                    className="absolute -top-5 cursor-pointer -right-5 w-10 h-10 bg-red-600 rounded-full text-white flex justify-center items-center text-lg shadow-lg hover:bg-white hover:text-red-600 transition-colors"
                >
                    <FaTimes />
                </button>


                <FaExclamationTriangle className="text-yellow-500 text-4xl" />


                <p className="text-center text-gray-800 font-semibold text-lg">
                    Are you sure you want to delete product ID: <span className="font-bold">{productID}</span>?
                </p>


                <div className="flex gap-4 mt-2">
                    <button
                        onClick={close}
                        className="px-4 py-2 w-[100px] bg-green-900 text-white font-medium hover:bg-green-800 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={deleteProduct}
                        className="px-4 py-2 w-[100px]  bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
                    >
                        Yes
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
            <div className="w-full min-h-screen bg-white">

                {isDeleteConfirmVisible && (
                    <ProductDeleteConfirm
                        productID={productToDelete}
                        close={() => setIsDeleteConfirmVisible(false)}
                        refresh={() => setIsLoading(true)}
                    />
                )}


                <div className="mx-auto max-w-8xl">

                    <div className="border border-secondary/10 bg-white shadow-sm">

                        <div className="flex items-center justify-between gap-4 border-b bg-white border-secondary/10 px-6 py-4">
                            <h1 className="text-lg font-semibold text-gray-900">
                                Products
                            </h1>
                            <span className="px-3 py-1 text-xs font-medium text-green-900 bg-green-100 rounded-2xl">
                                {filteredProducts.length} items
                            </span>
                        </div>


                        <div className="p-4">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                            />
                        </div>


                        <div className="overflow-x-auto">
                            {isLoading ? (
                                <Loader />
                            ) : (
                                <table className="w-full min-w-[1100px] text-left">
                                    <thead className="bg-green-900 text-white">
                                        <tr>
                                            <th className="px-4 py-3 text-xs font-semibold uppercase">
                                                Image
                                            </th>
                                            <th className="px-4 py-3 text-xs font-semibold uppercase">
                                                PID
                                            </th>
                                            <th className="px-4 py-3 text-xs font-semibold uppercase">
                                                Name
                                            </th>
                                            <th className="px-4 py-3 text-xs font-semibold uppercase">
                                                Price
                                            </th>

                                            <th className="px-4 py-3 text-xs font-semibold uppercase">
                                                Stock
                                            </th>

                                            <th className="px-4 py-3 text-xs font-semibold uppercase">
                                                Category
                                            </th>
                                            <th className="px-4 py-3 text-xs font-semibold uppercase text-center">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-secondary/10">
                                        {filteredProducts.map((item) => (
                                            <tr
                                                key={item.productID}
                                                className="odd:bg-white even:bg-green-50 hover:bg-green-100 transition-colors"
                                            >
                                                <td className="px-4 py-3 ">
                                                    <img
                                                        src={item.images?.[0]}
                                                        alt={item.name}
                                                        className="h-16 w-16 object-cover ring-1 ring-gray-300"
                                                    />
                                                </td>
                                                <td className="px-4 py-3 font-mono text-sm text-gray-600 ">
                                                    {item.productID}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-800   ">
                                                    {item.name}
                                                </td>
                                                <td className="px-4 py-3 text-gray-700 ">
                                                    <span className="rounded-md bg-green-100 px-2 py-1 text-sm text-green-700">
                                                        LKR {item.price}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-3 text-gray-700 ">
                                                    <span className="rounded-md bg-gray-100 px-2 py-1 text-sm text-gray-700">
                                                        {item.stock}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-3 ">
                                                    <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
                                                        {item.category}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 ">
                                                    <div className="flex items-center justify-center gap-3">
                                                        <FaRegTrashCan
                                                            className="cursor-pointer rounded-lg p-2 text-gray-500 ring-1 ring-gray-300 hover:bg-red-100 hover:text-red-600 transition"
                                                            size={34}
                                                            title="Delete"
                                                            onClick={() => {
                                                                setProductToDelete(
                                                                    item.productID
                                                                );
                                                                setIsDeleteConfirmVisible(
                                                                    true
                                                                );
                                                            }}
                                                        />
                                                        <FaRegEdit
                                                            className="cursor-pointer rounded-lg p-2 text-gray-500 ring-1 ring-gray-300 hover:bg-blue-100 hover:text-blue-600 transition"
                                                            size={34}
                                                            title="Edit"
                                                            onClick={() =>
                                                                navigate(`/admin/update-product/${item.productID}`, { state: item })
                                                            }
                                                        />


                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {filteredProducts.length === 0 && (
                                            <tr>
                                                <td
                                                    className="px-4 py-12 text-center text-gray-500"
                                                    colSpan={9}
                                                >
                                                    No products to display.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>


            <button
                onClick={() => setIsAddOpen(true)}
                aria-label="Add Product"
                title="Add Product"
                className="fixed right-[50px] bottom-[50px] text-5xl text-green-900 hover:text-green-600"
            >
                <CiCirclePlus />
            </button>

            <AdminAddProducts
                isOpen={isAddOpen}
                onClose={() => setIsAddOpen(false)}
                refresh={() => setIsLoading(true)}
            />

        </>
    );
}