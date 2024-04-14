import { useState, useEffect } from "react";
import Appbar from "../components/Appbar";
import axios from "axios";
import { Api } from "../apiConfig";

export default function Profile() {
    const [user, setUser] = useState({});

    async function fetchUser() {
        try {
            let token = "Bearer " + localStorage.getItem("token");
            let response = await axios.get(Api + '/user/me', {
                headers: {
                    authorization: token
                }
            })
            if (response.data.user) setUser(response.data.user);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchUser();
    },[])

    return (
        <div className = "bg-black text-white h-screen">
            <Appbar />
            <div className = "flex justify-center">
             <h1 className = "text-2xl font-bold p-2"> Profile </h1>
                
            </div>
            <div className = "flex justify-center">
                <div className = "bg-white text-black p-5 pt-3 pl-2 text-left font-semibold">    
                    <br />
                    <h3>Name : {user.name}</h3>
                    <h3>Email : {user.email}</h3>
                    <h3>Phone: {user.phone}</h3>
                </div>
            </div>
        </div>
    )
}