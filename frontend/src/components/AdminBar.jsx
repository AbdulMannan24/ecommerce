import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from 'react-icons/fa';
import { useState } from 'react';

export default function AdminBar() {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="flex justify-between text-white p-5">
            <div>
                <Link to = "/dashboard"><h1 className="text-xl font-bold">Ecommerce</h1> </Link>
            </div>
            <div className="px-10 md:hidden">
                <button onClick={toggleDropdown}>
                    <FaSignOutAlt />
                </button>
                <div className={`${dropdownOpen ? 'block' : 'hidden'} absolute right-0 mt-12 bg-white rounded-lg shadow-md z-10`}>
                    <Link to="/addProduct" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Add Product</Link>
                    <Link to="/allusers" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">All Users</Link>
                    <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={(e) => {
                        localStorage.setItem("token", "");
                        navigate("/");
                    }}>Sign Out</button>
                </div>
            </div>
            <div className="hidden md:flex">
                <Link to="/addProduct" className="px-4 text-semibold">Add Product</Link>
                <Link to="/allUsers" className="px-4 text-semibold">All Users</Link>
                <button className="pl-0" onClick={(e) => {
                    localStorage.setItem("token", "");
                    navigate("/");
                }}><FaSignOutAlt/></button>
            </div>
        </div>
    )
}