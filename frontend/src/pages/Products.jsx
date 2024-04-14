import { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Product from "../components/Product";
import { Api } from "../apiConfig";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { BiRefresh } from 'react-icons/bi';


export default function Products() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    async function getProducts() {
        try {
            let response = await axios.get(Api + '/product/search/' + search);
            if (response.data.products) setProducts(response.data.products);
            else window.alert("Product not found");
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchProducts() {
        try{
            let token = "Bearer " + localStorage.getItem("token");
            let response = await axios.get(Api + "/product/", {
                headers: {
                    authorization: token
                }
            })
            setProducts(response.data.products)
            //console.log(response.data)
        } catch(error) {
            console.log(error);
            window.alert("Failed to fetch products");
        }
    }
    useEffect(()=> {
        fetchProducts();
    },[])
    return (
        <div className="bg-black h-screen overflow-auto">
            <Appbar />
            <br />

           <div class="grid grid-cols-2">
                <div>
                    < input className="ml-10 w-full mr-2" placeholder="search products " onChange={(e)=> {setSearch(e.target.value)}}></input>
                </div>
                <div>
                    <button className="ml-12 text-black bg-white p-1 pb-0 px-3" onClick = {getProducts}> Search</button>
                    <button className="ml-1 text-black bg-white p-1 pt-1 px-1" onClick = {fetchProducts}>  <BiRefresh /></button>
                </div>
            </div>

            <div className="flex flex-wrap pt-10 px-8 justify-between">
                {products.map(product => <div className= "p-3" id = {product._id}> <Product key={product._id} 
                    name = {product.name}
                    price = {product.price}
                    image={product.image}
                    description={product.description}
                    style = "bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
                    option = {"Add to Cart"}
                    onPress = {()=>{
                       try {
                            let token = 'Bearer ' + localStorage.getItem("token");
                            let productId = product._id;
                            console.log(token);
                            // let response =  axios.post(Api + '/cart/add/'+ productId, {
                            //     headers: { authorization: token}
                            // })
                            // if (response.data.message == "success") window.alert("Product Added to Cart");
                            // else window.alert("Failed to Add product to Cart");
                            let url = Api + '/cart/add/'+ productId;
                            axios.post(url, {},{ headers: { authorization: token}})
                            .then(response => {
                                window.alert("product added to cart");
                            }).catch(err => console.log(err))
                       } catch (error) {
                            console.log(error);
                       }
                    }}
                    onView={()=>{
                        navigate('/productdetails/' + product._id)
                    }}
                    />
                    </div>
                    )}
            </div>
        </div>
    )
}