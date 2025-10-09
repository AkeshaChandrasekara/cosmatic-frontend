import { FaSearch } from "react-icons/fa";

export default function SearchBar({ placeholder = "Search products..." }) {
    return (
        <div className="relative  max-w-xs md:max-w-sm w-full md:w-[350px] rounded-md">
            <input
                type="text"
                placeholder={placeholder}
                className="w-full border bg-gray-50 border-gray-50 text-black rounded-md pl-4 pr-10 py-2 text-sm focus:outline-none  focus:border-white transition duration-200"
            />
            <FaSearch className="absolute right-3 top-2.5 text-green-900" size={16} />
        </div>
    );
}
