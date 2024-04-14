// import { Link, useNavigate } from "react-router-dom";
// import { FaSignOutAlt } from 'react-icons/fa';


// export default function Appbar() {
//     const navigate = useNavigate();

//     return (
//         <div className="flex justify-between text-white p-5">
//             <div >
//                 <h1 className="text-xl font-bold">Ecommerce</h1>
//             </div>
//             <div className="px-10">
//                 <Link to="/products" > <span className="px-4 text-semibold">Products</span> </Link> 
//                 <Link to="/cart" > <span className="px-4 text-semibold">Cart</span> </Link>
//                 <Link to="/profile"> <span className="pl-4 pr-5 text-semibold">Profile</span></Link>
//                 <button className="pl-0" onClick={(e)=> {
//                     localStorage.setItem("token", "");
//                     navigate("/signin");
//                  }}><FaSignOutAlt/></button>
//             </div>
//         </div>
//     )
// }
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from 'react-icons/fa';
import { useState } from 'react';

export default function Appbar() {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="flex justify-between text-white p-5">
            <div>
                <Link to = "/products"><h1 className="text-xl font-bold">Ecommerce</h1> </Link>
            </div>
            <div className="px-10 md:hidden">
                <button onClick={toggleDropdown}>
                    <FaSignOutAlt />
                </button>
                <div className={`${dropdownOpen ? 'block' : 'hidden'} absolute right-0 mt-12 bg-white rounded-lg shadow-md z-10`}>
                    <Link to="/products" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Products</Link>
                    <Link to="/cart" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Cart</Link>
                    <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</Link>
                    <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={(e) => {
                        localStorage.setItem("token", "");
                        navigate("/");
                    }}>Sign Out</button>
                </div>
            </div>
            <div className="hidden md:flex">
                <Link to="/products" className="px-4 text-semibold">Products</Link>
                <Link to="/cart" className="px-4 text-semibold">Cart</Link>
                <Link to="/profile" className="px-4 text-semibold">Profile</Link>
                <button className="pl-0" onClick={(e) => {
                    localStorage.setItem("token", "");
                    navigate("/");
                }}><FaSignOutAlt/></button>
            </div>
        </div>
    )
}
