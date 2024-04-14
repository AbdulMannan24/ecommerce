import { useState } from "react";
import AdminBar from "../components/AdminBar";
import InputBox from "../components/InputBox";
import axios from "axios";
import { Api } from "../apiConfig";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const navigate = useNavigate();

    async function addProduct() {
        try {
            let token = "Bearer " + localStorage.getItem("token");
            let response = await axios.post(Api + '/product/add', {
                name,
                description,
                price,
                image
            }, {
                headers : { authorization: token}
            })
            if (response.data.message === "success") {
                window.alert("Product added successfully");
                navigate('/dashboard');
            } else {
                window.alert(response.data.message);
                navigate('/dashboard')
            } 
        } catch (error) {
            console.log(error);
            window.alert("Backend: failed to add product");
        }
    }

    return (
        <div className="bg-black text-white h-screen">
            < AdminBar />
            <h1 className="text-2xl text-center font-bold"> Add Product</h1>
            <br />
            <div className="flex justify-center">
            <div className="text-left">
                <InputBox 
                    label={"Product Name: "}
                    placeholder={"Macbook Pro"}
                    type={"text"}
                    name={"name"}
                    onChange={(e) => {setName(e.target.value)}}
                />
                <br />
                <InputBox 
                    label={"Description"}
                    placeholder={"product details"}
                    type={"text"}
                    name={"description"}
                    onChange={(e) => {setDescription(e.target.value)}}
                    />
                <br />
                <InputBox 
                    label={"Price : "}
                    placeholder={"1000"}
                    type={"number"}
                    name={"price"}
                    onChange={(e) => {setPrice(e.target.value)}}
                    />
                <br />
                <InputBox 
                    label={"Image Link : "}
                    placeholder={"https://aws.storage.adl"}
                    type={"text"}
                    name={""}
                    onChange={(e) => {}}
                    />
                <br />
                <br />
                <div className="text-center">
                    <button className="text-black bg-white rounded px-5" onClick={addProduct}>Add</button>
                </div>
            </div>
            </div>
        </div>
    )
}