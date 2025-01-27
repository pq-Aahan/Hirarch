const ControlPanel = () => {
    const handleApprove = async () => {
        const emailId = localStorage.getItem("emailId"); // Assuming you store the logged-in user's ID
        const comment = "Your comment text here"; // Replace with the actual comment value
    
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
                alert(data.message); // Success message from the backend
            } else {
                const errorData = await response.json();
                alert(`Failed to approve: ${errorData.message}`);
            }
        } catch (err) {
            console.error("Error approving:", err);
            alert("An error occurred while approving.");
        }
    };
    
    
    const UserName = localStorage.getItem("firstName") || "User";
    console.log("First Name:", UserName); // Debug log to ensure it is fetched correctly

    return (
        <div className="bg-slate-200 border border-black flex flex-col items-center justify-center min-h-screen p-6">
            <h1 className="text-2xl font-bold mb-6">Control Panel Welcomes {UserName}</h1>
            
            <div className="border border-green-400 flex flex-col items-center p-4 rounded-lg bg-white shadow-lg w-full max-w-md">
                <h2 className="text-lg font-medium mb-4">Comment</h2>
                
                <input
                    className="border border-gray-400 p-2 rounded w-full mb-4"
                    type="text"
                    placeholder="Enter your comment"
                />
                
                <button
                    className="text-lg font-medium border border-blue-300 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    type="submit" onClick={handleApprove}

                >
                    Approve
                </button>
            </div>
        </div>
    );
};

export default ControlPanel;
