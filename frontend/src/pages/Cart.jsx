import { Api } from "../apiConfig";
import Appbar from "../components/Appbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Product from "../components/Product";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const [products, setProducts] = useState([{}]);
    const navigate = useNavigate();

    async function fetchCart() {
        try {
            let token = 'Bearer ' + localStorage.getItem('token');
            let response = await axios.get(Api + '/cart/', {
                headers: { authorization : token}
            });
            if (response.data) setProducts(response.data.products);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCart();
    }, [])

    return (
        <div className="bg-black h-screen overflow-auto">
            <Appbar />
            {products.length == 0? <h1 className="text-2xl text-white text-center p-20"> Cart is Empty</h1> :
            <div className="flex flex-wrap pt-10 px-5 justify-between" >
                {products.map(product => <div className= "p-3" key = {product._id}> <Product key={product._id} 
                    name = {product.name}
                    price = {product.price}
                    image={product.image}
                    description={product.description}
                    option = {"Remove from Cart"}
                    style = "bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
                    onPress = {async ()=>{
                        try {
                            let token = "Bearer " + localStorage.getItem("token"); 
                            console.log(product._id);
                            let response = await axios.delete(Api + '/cart/remove/' + product._id, {
                                headers: { authorization: token}
                            })
                            if (response.data.message == "success") {
                                fetchCart();
                            } 
                        } catch (error) {
                            console.log(error);
                        }
                    }}
                    onView = {()=>{
                        navigate('/productdetails/' + product._id)
                     }}
                    />
                    
                    </div>

                )}
            </div>
            }   

        </div>
    )
}