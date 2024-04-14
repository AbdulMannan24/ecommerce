import { useState, useEffect } from "react";
import AdminBar from "../components/AdminBar";
import axios from "axios";
import Product from "../components/Product";
import { Api } from "../apiConfig";


export default function AdminDashboard() {
    const [products, setProducts] = useState([]);

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
        <div className="bg-black h-screen overflow-auto" >
            < AdminBar />
            <div className="flex flex-wrap pt-10 px-8 justify-between">
                {products.map(product => <div className= "p-3" id = {product._id}> <Product key={product._id} 
                    name = {product.name}
                    price = {product.price}
                    image={product.image}
                    description={product.description}
                    style = "hidden"
                    option = {"Delete"}
                    onPress = {async ()=>{
                       try {
                          let token = "Bearer " + localStorage.getItem("token");
                          console.log(product._id)
                          let response = await axios.delete(Api + '/product/delete/' + product._id, {
                            headers: { authorization: token}
                          });
                          if (response.data.message == "success") {
                            window.alert("Product Deleted Successfully");
                            fetchProducts();
                          } 
                       } catch (error) {
                       }
                    }}
                    
                    />
                    </div>
                    )}
            </div>
        </div>
    )
}