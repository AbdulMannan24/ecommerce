import { useState, useEffect } from "react";
import AdminBar from "../components/AdminBar";
import axios from "axios";
import { Api } from "../apiConfig";

export default function Users() {
    const [users, setUsers] = useState([{}]);

    async function fetchUsers() {
        try {
            let token = "Bearer " + localStorage.getItem("token");
            let response = await axios.get(Api + '/admin/allusers', { 
                headers: { authorization: token}
            })
            console.log(response.data);
            if (response.data.users) setUsers(response.data.users);
            console.log(users);
        } catch (error) {
            console.log(error);
        }   
    }
    useEffect(()=> {
        fetchUsers();
    }, []);

    return (
        <div className="bg-black h-screen text-white">
            < AdminBar />
            <br />
            <h1 className="text-2xl font-bold text-center"> Users </h1>
            <div className="text-center m-8">
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                </tr>
            </thead>
            <tbody className="bg-black divide-y divide-gray-200">
                {users.map(user => <tr >
                        <td className="text-white px-6 py-4 whitespace-nowrap">{user.name}</td>
                        <td className="text-white px-6 py-4 whitespace-nowrap">{user.email}</td>
                        <td className="text-white px-6 py-4 whitespace-nowrap">{user.phone}</td>
                    </tr> 
                )}
                {/* <tr  >
                        <td className="text-white px-6 py-4 whitespace-nowrap">abcd</td>
                        <td className="text-white px-6 py-4 whitespace-nowrap">abcd@gmail.con</td>
                        <td className="text-white px-6 py-4 whitespace-nowrap">safdfas</td>
                </tr> */}
            </tbody>
            </table>

            </div>
        </div>
    )
}