import axios from "axios";
import Appbar from "../components/Appbar";
import { useParams } from 'react-router-dom';
import { Api } from "../apiConfig";
import { useState, useEffect } from "react";

export default function ProductDetails() {
    const params = useParams();
    const { id } = params;
    console.log(id);
    const [product, setProduct] = useState({});
    
    async function fetchProduct() {
        try {
            let token = "Bearer " + localStorage.getItem("token");
            let response = await axios.get(Api + '/product/' + id, {
                headers: {
                    authorization: token
                }
            })
            if (response.data.product) setProduct(response.data.product); 
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchProduct();
    }, [])
    return (
        <div className="bg-black h-screen">
            <Appbar />
            <br />
            <div className="text-center ">
            <div className="m-20 flex-col justify-center bg-white ">
                <div>
                    <img className="w-80 h-60 object-cover object-center mx-auto" src={product.image} alt="" />
                </div>
                <div className="">
                    <h2 className="text-xl font-bold mb-2">Name: {product.name}</h2>
                    <p className="text-gray-700 mb-4">details: {product.description}</p>
                    <p className="font-semibold mb-2">price: ${product.price}</p>
                    <p>ratings : {product.ratings}</p>
                    <p>No of ratings: {product.ratingsCount}</p>
                </div>
            </div>
            </div>
        </div>
    )
}