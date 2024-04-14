import { useState } from "react";
import InputBox from "../components/InputBox";
import { Api } from "../apiConfig";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    async function handleSignIn() {
        try {
            const response = await axios.post(Api + "/user/signin", {
                email,
                password
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
            window.alert("Back End error" + error);
        }
    }

    return (
        <div className="bg-slate-900 h-screen w-screen flex justify-center">
            <div className="bg-black mt-40 mb-20 p-5 text-white">
                <br />
                <br />
                <h1 className="text-2xl text-center"> SignIn</h1>
                <br />
                <div className="text-center"> 
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
                    type={"password"}
                    label = {"Password :"}
                    name={"password"} 
                    placeholder={"password"}
                    onChange={(e)=> {
                        setPassword(e.target.value);
                    }}/>
                <br />
                <div className="text-center p-2">
                    <button className="bg-white text-black p-1 " onClick={handleSignIn}> Sign In </button>
                </div>
                </div>
            </div>
        </div>
    )
}