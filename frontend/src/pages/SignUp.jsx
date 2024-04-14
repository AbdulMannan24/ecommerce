import { useState } from "react";
import InputBox from "../components/InputBox";
import { Api } from "../apiConfig";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    async function handleSignUp() {
        try {
            const response = await axios.post(Api + "/user/signup", {
                name,
                email,
                password,
                phone
            });
            // Handle success
            if (response.data.message === "success") {
                localStorage.setItem("token", response.data.token);
                navigate("/products");
            } else {
                window.alert(response.data.message);
            }
        } catch (error) {
            // Handle error
            console.error(error);
            window.alert("Back End error");
        }
    }

    return (
        <div className="bg-slate-900 h-screen w-screen flex justify-center">
            <div className="bg-black mt-40 mb-20 p-5 text-white">
                <h1 className="text-2xl text-center"> SignUp</h1>
                <br />
                <div className="text-center">
                <InputBox 
                    type={"text"}
                    label = {"Name :"}
                    name={"name"} 
                    placeholder={"John"}
                    onChange={(e)=> {
                        setName(e.target.value);
                    }}/>
                <br />
                <InputBox 
                    type={"text"}
                    label = {"Email :"}
                    name={"email"} 
                    placeholder={"john@gmail.com"}
                    onChange={(e)=> {
                        setEmail(e.target.value);
                    }}/>
                <br />
                <InputBox 
                    type={"text"}
                    label = {"Phone :"}
                    name={"phone"} 
                    placeholder={"9567823451"}
                    onChange={(e)=> {
                        setPhone(e.target.value)
                    }}/>
                <br />
                <InputBox 
                    type={"password"}
                    label = {"Password :"}
                    name={"password"} 
                    placeholder={"password"}
                    onChange={(e)=> {
                        setPassword(e.target.value);
                    }}/>
                <br />
                <div className="text-center p-2">
                    <button className="bg-white text-black p-1 " onClick={handleSignUp}> Sign Up </button>
                </div>
                </div>
            </div>
        </div>
    )
}