import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GetUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleClick=(user)=>{
        console.log("User Clicked")
        localStorage.setItem("selectedUser", JSON.stringify(user)); // Store user in localStorage
       console.log("User 1",user)
        navigate("/UserEdit")
    }

    const handleBack = () => {
        navigate("/login"); // 👈 or change to wherever you want to go back
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:5001/api/getUsers", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                console.log("Users data:", data); // Debug log
                setUsers(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-4">
<div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">User List</h1>
                <button
                    onClick={handleBack}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded shadow"
                >
                    Back
                </button>
            </div>            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user) => (
                    <div
                        key={user._id}
                        className="p-4 bg-white shadow rounded-lg border border-gray-200 hover:bg-sky-700"   onClick={() => {handleClick(user)}}
                    >
                        <h2 className="text-lg font-semibold">{user.firstName || "N/A"} {user.lastname || "N/A"}</h2>
                        <p className="text-sm text-gray-600"><strong>Email:</strong> {user.emailId}</p>
                        <p className="text-sm text-gray-600"><strong>Comment:</strong> {user.comment}</p>
                        <p className="text-sm text-gray-600"><strong>Company:</strong> {user.companyName || "N/A"}</p>
                        <p className="text-sm text-gray-600"><strong>Role:</strong> {user.roleId}</p>
                        <p className="text-sm text-gray-600"><strong>Level:</strong> {user.levelId}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GetUsers;