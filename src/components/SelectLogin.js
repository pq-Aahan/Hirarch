import React from "react";
import { useNavigate } from "react-router-dom";

const SelectLogin = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full px-4">
                {/* Admin Panel Card */}
                <div
                    onClick={() => navigate("/AdminPanel")}
                    className="bg-white shadow-lg rounded-xl p-6 text-center cursor-pointer hover:bg-blue-100 transition duration-300"
                >
                    <h2 className="text-2xl font-semibold mb-2">Admin Panel</h2>
                    <p>Manage users, view stats, and perform admin actions</p>
                </div>

                {/* Get Users Card */}
                <div
                    onClick={() => navigate("/GetUsers")}
                    className="bg-white shadow-lg rounded-xl p-6 text-center cursor-pointer hover:bg-green-100 transition duration-300"
                >
                    <h2 className="text-2xl font-semibold mb-2">Get Users</h2>
                    <p>View and search registered users from the database</p>
                </div>
            </div>
        </div>
    );
};

export default SelectLogin;
