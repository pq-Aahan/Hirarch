import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ← import

const ControlPanel = () => {
    const [comment, setComment] = useState("");
    const navigate = useNavigate();
    const handleApprove = async () => {
        const emailId = localStorage.getItem("emailId"); 
        console.log("Email ID from localStorage:", emailId); // Debug log
        // if (!emailId || !comment.trim()) {
        //     alert("Both email ID and comment are required.");
        //     return;
        // }
        const comment="test comment";

        try {
            const response = await fetch("http://localhost:5001/api/approve", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ emailId, comment }),
            });

            console.log("Response status:", response.status);

            if (response.ok) {
                const data = await response.json();
                alert(data.message); // success message from backend
            } else {
                const errorData = await response.json();
                alert(`Failed to approve: ${errorData.message}`);
            }
        } catch (err) {
            console.error("Error approving:", err);
            alert("An error occurred while approving.");
        }
    };
    const handleBack = () => {
        navigate("/login"); // ← navigate to login page
    };
    const UserName = localStorage.getItem("firstName") || "User";

    return (
        <div className="bg-slate-200 border border-black flex flex-col items-center justify-center min-h-screen p-6">
            <h1 className="text-2xl font-bold mb-6">Control Panel Welcomes {UserName}</h1>

            <div className="border border-green-400 flex flex-col items-center p-4 rounded-lg bg-white shadow-lg w-full max-w-md">
                <h2 className="text-lg font-medium mb-4">Comment</h2>

                <input
                    className="border border-gray-400 p-2 rounded w-full mb-4"
                    type="text"
                    placeholder="Enter your comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />

<div className="flex justify-between w-full">
                    <button
                        className="text-lg font-medium border border-gray-300 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                        onClick={handleBack}
                    >
                        Back
                    </button>

                    <button
                        className="text-lg font-medium border border-blue-300 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                        onClick={handleApprove}
                    >
                        Approve
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ControlPanel;
