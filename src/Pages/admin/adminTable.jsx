import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaTimes, FaExclamationTriangle } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import AdminAddCustomer from "./adminAddCustomer";
import AdminUpdate from "./adminUpdate";
import { Loader } from "../../components/loader";

function AdminDeleteConfirm({ adminID, close, refresh }) {
    function deleteAdmin() {
        const token = localStorage.getItem("token");
        axios
            .delete(`${import.meta.env.VITE_API_URL}/api/users/${adminID}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                toast.success("Admin deleted successfully");
                close();
                refresh();
            })
            .catch(() => toast.error("Failed to delete admin"));
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex justify-center items-center px-4">
            <div className="bg-green-50 shadow-2xl relative max-w-sm w-full p-6 flex flex-col items-center gap-6 animate-fadeIn">
                <button
                    onClick={close}
                    className="absolute -top-5 -right-5 w-10 h-10 bg-red-600 rounded-full text-white flex justify-center items-center text-lg shadow-lg hover:bg-white hover:text-red-600 transition-colors"
                >
                    <FaTimes />
                </button>

                <FaExclamationTriangle className="text-yellow-500 text-4xl" />
                <p className="text-center text-gray-800 font-semibold text-lg">
                    Are you sure you want to delete admin ID:{" "}
                    <span className="font-bold">{adminID}</span>?
                </p>

                <div className="flex gap-4 mt-2">
                    <button
                        onClick={close}
                        className="px-4 py-2 w-[100px] bg-green-900 text-white font-medium hover:bg-green-800 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={deleteAdmin}
                        className="px-4 py-2 w-[100px] bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function AdminTable() {
    const [admins, setAdmins] = useState([]);
    const [search, setSearch] = useState("");
    const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
    const [adminToDelete, setAdminToDelete] = useState(null);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [adminToUpdate, setAdminToUpdate] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const currentUserRole = localStorage.getItem("role");

    useEffect(() => {
        if (isLoading) {
            const token = localStorage.getItem("token");
            axios
                .get(`${import.meta.env.VITE_API_URL}/api/users`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    setAdmins(res.data.filter((u) => u.role === "admin"));
                    setIsLoading(false);
                })
                .catch(() => {
                    toast.error("Failed to fetch admins");
                    setIsLoading(false);
                });
        }
    }, [isLoading]);

    const filteredAdmins = admins.filter(
        (c) =>
            (c.firstName + " " + c.lastName).toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full min-h-screen bg-white">
            {isDeleteConfirmVisible && (
                <AdminDeleteConfirm
                    adminID={adminToDelete}
                    close={() => setIsDeleteConfirmVisible(false)}
                    refresh={() => setIsLoading(true)}
                />
            )}

            {isUpdateOpen && adminToUpdate && (
                <AdminUpdate
                    isOpen={isUpdateOpen}
                    onClose={() => setIsUpdateOpen(false)}
                    admin={adminToUpdate}
                    refresh={() => setIsLoading(true)}
                />
            )}

            <div className="mx-auto max-w-8xl">
                <div className="border border-secondary/10 bg-white shadow-sm">
                    <div className="flex items-center justify-between gap-4 bg-white border-b border-secondary/10 px-6 py-4">
                        <h1 className="text-lg font-semibold text-green-900">Admins</h1>
                        <span className="px-3 py-1 text-xs font-medium text-green-900 bg-green-100 rounded-2xl">{filteredAdmins.length} admins</span>
                    </div>

                    <div className="p-4">
                        <input
                            type="text"
                            placeholder="Search admins..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                        />
                    </div>

                    <div className="overflow-x-auto">
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <table className="w-full min-w-[880px] text-left">
                                <thead className="bg-green-900 text-white">
                                    <tr>
                                        <th className="px-4 py-3 text-xs font-semibold uppercase">Image</th>
                                        <th className="px-4 py-3 text-xs font-semibold uppercase">Name</th>
                                        <th className="px-4 py-3 text-xs font-semibold uppercase">Email</th>
                                        <th className="px-4 py-3 text-xs font-semibold uppercase">Role</th>
                                        <th className="px-4 py-3 text-xs font-semibold uppercase text-center">Actions</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-secondary/10">
                                    {filteredAdmins.map((c) => (
                                        <tr key={c._id} className="odd:bg-white even:bg-green-50 hover:bg-green-100 transition-colors">
                                            <td className="px-4 py-3">
                                                {c.image ? (
                                                    <img src={c.image} alt={`${c.firstName} ${c.lastName}`} className="w-15 h-15  object-cover" />
                                                ) : (
                                                    <div className="w-15 h-15  object-cover bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                                                        {c.firstName?.[0] || "A"}
                                                    </div>
                                                )}
                                            </td>

                                            <td className="px-4 py-3 font-medium text-gray-800">{c.firstName} {c.lastName}</td>
                                            <td className="px-4 py-3 text-gray-700">{c.email}</td>
                                            <td className="px-4 py-3">
                                                <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-red-100 text-red-700">{c.role}</span>
                                            </td>

                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-center gap-3">
                                                    <RiDeleteBin6Line
                                                        className="cursor-pointer rounded-lg p-2 text-gray-500 ring-1 ring-gray-300 hover:bg-red-100 hover:text-red-600 transition"
                                                        size={34}
                                                        onClick={() => {
                                                            setAdminToDelete(c._id);
                                                            setIsDeleteConfirmVisible(true);
                                                        }}
                                                    />
                                                    {currentUserRole === "admin" && (
                                                        <FiEdit
                                                            className="cursor-pointer rounded-lg p-2 text-gray-500 ring-1 ring-gray-300 hover:bg-blue-100 hover:text-green-600 transition"
                                                            size={34}
                                                            onClick={() => {
                                                                setAdminToUpdate(c);
                                                                setIsUpdateOpen(true);
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredAdmins.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="px-4 py-12 text-center text-gray-500">
                                                No admins to display.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>

            <button
                onClick={() => setIsAddOpen(true)}
                className="fixed right-[50px] bottom-[50px] text-5xl text-green-900 hover:text-green-800 cursor-pointer transition-colors duration-200"
            >
                <CiCirclePlus />
            </button>

            <AdminAddCustomer
                isOpen={isAddOpen}
                onClose={() => {
                    setIsAddOpen(false);
                    setIsLoading(true);
                }}
            />
        </div>
    );
}
