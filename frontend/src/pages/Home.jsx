import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="bg-black h-screen overflow-auto text-white">
            <div className="flex justify-between">
                <h1 className="text-xl font-bold pl-10 pt-5">Ecommerce</h1>
                 <div>
                    <Link to = "/signin"> <button className="pt-5 px-3">Login</button></Link>
                    <Link to = "/signup"> <button className="pt-5 px-3">SignUp</button></Link> 
                 </div>
            </div>
            <br />
            <div className=" hidden sm:block bg-[url('https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2022/02/ecommerce-trends-2.webp')] bg-cover bg-center h-screen">
                <br />
                <div className="flex justify-end"><Link to = "/admin"><button className="bg-black text-white rounded font-semibold px-5">Admin</button></Link></div>
                <h1 className="text-5xl font-bold pl-10 pt-5 text-black">Welcome to</h1>
                <h1 className="text-5xl font-bold pl-10 pt-5 text-black">Ecommerce</h1>
                <h3  className="text-2xl font-semibold pl-10 pt-5 text-black">Shop like Never Before!</h3>
                <br />
               
            </div>
            <div className="block sm:hidden">
                <h1 className="text-3xl font-bold pl-10 pt-5 ">Welcome to</h1>
                <h1 className="text-3xl font-bold pl-10 pt-5 ">Ecommerce</h1>
                <h3  className="text-1xl font-semibold pl-10 pt-5">Shop like Never Before!</h3>
                <br />
                <br />
                <div className="text-center">
                    <button className="bg-white text-black rounded font-semibold px-5">Admin</button>
                </div>
            </div>
        </div>
    )
}