import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const[count,setCount]=useState(0);
    const[companyName,setCompanyName]=useState("");
    const[approvers,setApprovers]=useState([]);
    const navigate = useNavigate();

    const handleApproverChange = (index, field, value) => {
        const updatedApprovers = [...approvers];
        updatedApprovers[index] = {
          ...updatedApprovers[index],
          [field]: value,
        };
        console.log("Updated approvers:", updatedApprovers); // Debug log

        setApprovers(updatedApprovers);
      };
    
      const handleSubmit = async () => {
        try {
            console.log("Approvers before validation:", approvers);

            if (!companyName.trim()) {
              alert("Company name is required.");
              return;
            }
        
            if (
              approvers.some(
                (approver) =>
                  !approver.emailId?.trim() ||
                  !approver.firstName?.trim() ||
                  !approver.password?.trim() ||
                  !approver.lastname?.trim() // Validate lastname too
              )
            ) {
              alert("Please fill all approver details.");
              return;
            }
    
          // Add company name to each approver
          const payload = approvers.map((approver) => ({
            ...approver,
            lastname: approver.lastname || "", // Default lastname if not provided
            roleId: 2,
            companyName,
          }));

    
          const response = await fetch("http://localhost:5001/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
    
          if (!response.ok) {
            throw new Error("Failed to register approvers.");
          }
    
          alert("All approvers have been registered successfully.");
        } catch (error) {
          console.error("Error submitting data:", error);
          alert("There was an error submitting the data.");
        }
      };

      const handleBack = () => {
        navigate("/SelectLogin");
    };



  return (
    <div className="flex items-center flex-col border border-green-950">
            <div className="flex justify-between w-full items-center bg-pink-200 border border-black p-4">
                <h1 className="font-bold text-center w-full">Admin Panel</h1>
                <button
                    onClick={handleBack}
                    className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600 ml-auto"
                >
                    Back
                </button>
            </div>
      <div className="flex flex-row p-4">
      <h2>Name of company: </h2>
      <input
          type="text"
          placeholder="Enter Company Name"
          className="border border-black mx-2 p-2 rounded-md w-full"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />      </div>
      <h3 className="flex flex-row p-4">Image of company</h3>
      <div className="flex flex-row p-4">
      <h2>Number of Approvers</h2>
      <input
  type="text"
  placeholder="Enter the number"
  className="border border-black mx-2 p-2 rounded-md w-full"
  onInput={(e) => {
    const newCount = isNaN(parseInt(e.target.value, 10)) ? 0 : parseInt(e.target.value, 10);
    setCount(newCount);
    setApprovers([...Array(newCount)].map(() => ({ emailId: "", firstName: "", password: "" ,lastname:""})));
  }}
/>
      </div>
      {
      Array.from({length:count},(_,i)=> <div className="flex flex-column p-4 border border-red-300 m-2" key={i}><h3>Email of approvers</h3>
            <input type="text" placeholder="Enter Email" className="border border-black mx-2 p-2 rounded-md w-full " onChange={(e) => handleApproverChange(i, "emailId", e.target.value)}/> 
            <h3>First approver</h3>
            <input type="text" placeholder="Enter Name" className="border border-black mx-2 p-2 rounded-md w-full"  onChange={(e) => handleApproverChange(i, "firstName", e.target.value)}/>
            <h3>Last Name</h3>
            <input type="text" placeholder="Last Name" className="border border-black mx-2 p-2 rounded-md w-full"  onChange={(e) => handleApproverChange(i, "lastname", e.target.value)}/>

            <h3>Password</h3>
            <input type="text" placeholder="Enter Password" className="border border-black mx-2 p-2 rounded-md w-full"  onChange={(e) => handleApproverChange(i, "password", e.target.value)}/>

            </div>)
      }
      <button className="border bg-purple-300" onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default AdminPanel;
