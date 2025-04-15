import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError(""); // Reset error message
        try {
            const response = await fetch("http://localhost:5001/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ emailId: email, password }), 
            });

            const data = await response.json();
            console.log("API Response:", data);

            if (response.ok) {
                console.log("API Response:", data); 

                localStorage.setItem("token", data.token);
                localStorage.setItem("firstName", data.firstName);
                localStorage.setItem("roleId", data.roleId); 
                localStorage.setItem("_id", data.roleId);
                localStorage.setItem("userPassword", data.password); 
                localStorage.setItem("emailId", data.emailId); // ✅ Use this if your backend returns emailId
                if (!data.emailId) localStorage.setItem("emailId", email); 

                if (data.roleId === 1) {
                    navigate("/selectlogin"); 
                } else {
                    navigate("/ControlPanel");
                }
                
            } else {
                setError(data.message || "Login failed");
            }
        } catch (err) {
            console.error(err);
            setError("An error occurred while logging in.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="flex justify-center flex-col bg-slate-400 shadow-lg p-6 max-w-md w-full rounded-lg">
                <h1 className="text-center mb-4">Login Page</h1>
                {error && <p className="text-red-500 text-center mb-3">{error}</p>}
                <div className="flex flex-row justify-center mb-3 ml-0">
                    <h2>Email: </h2>
                    <input
                        className="rounded-sm mx-2 p-1"
                        type="text"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="flex flex-row justify-center mb-3">
                    <h2>Password: </h2>
                    <input
                        className="rounded-sm mx-2 p-1"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        className="rounded-xl bg-blue-500 text-white p-2 w-20 hover:bg-blue-600"
                        type="button"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
