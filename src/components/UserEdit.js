import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserEdit = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstName: "",
        lastname: "",
        emailId: "",
        comment: "",
        companyName: "",
        roleId: "",
        levelId: "",
    });

    useEffect(() => {
        const storedUser = localStorage.getItem("selectedUser");
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Load user from localStorage
        }
    }, []);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value }); // Update state on input change
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:5001/api/updateUser/${user._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            const data = await response.json();
            if (response.ok) {
                alert("User updated successfully!");
                localStorage.setItem("selectedUser", JSON.stringify(user)); // Update localStorage
                navigate("/getUsers"); // Redirect to user list
            } else {
                alert(data.message || "Update failed");
            }
        } catch (err) {
            console.error("Update Error:", err);
            alert("An error occurred while updating.");
        }
    };
    const handleBack = () => {
        navigate("/getUsers");
    };

    return (
        <div className="p-4">
<div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Edit User</h1>
                <button
                    onClick={handleBack}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded shadow"
                >
                    Back
                </button>
            </div>            <div className="bg-white shadow p-6 rounded-lg border border-gray-200">
                <label className="block mb-2">
                    <span className="font-semibold">First Name:</span>
                    <input type="text" name="firstName" value={user.firstName} onChange={handleChange} className="border p-2 w-full rounded" />
                </label>
                <label className="block mb-2">
                    <span className="font-semibold">Last Name:</span>
                    <input type="text" name="lastname" value={user.lastname} onChange={handleChange} className="border p-2 w-full rounded" />
                </label>
                <label className="block mb-2">
                    <span className="font-semibold">Email:</span>
                    <input type="text" name="emailId" value={user.emailId} readOnly className="border p-2 w-full rounded bg-gray-200" />
                </label>
                <label className="block mb-2">
                    <span className="font-semibold">Comment:</span>
                    <textarea name="comment" value={user.comment} onChange={handleChange} className="border p-2 w-full rounded"></textarea>
                </label>
                <label className="block mb-2">
                    <span className="font-semibold">Company:</span>
                    <input type="text" name="companyName" value={user.companyName} onChange={handleChange} className="border p-2 w-full rounded" />
                </label>
                <label className="block mb-2">
                    <span className="font-semibold">Role:</span>
                    <input type="number" name="roleId" value={user.roleId} onChange={handleChange} className="border p-2 w-full rounded" />
                </label>
                <label className="block mb-2">
                    <span className="font-semibold">Level:</span>
                    <input type="number" name="levelId" value={user.levelId} onChange={handleChange} className="border p-2 w-full rounded" />
                </label>
                <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Update
                </button>
            </div>
        </div>
    );
};

export default UserEdit;
