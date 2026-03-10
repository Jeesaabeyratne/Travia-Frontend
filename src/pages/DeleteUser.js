import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function DeleteUser() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleDelete = async () => {
    const response = await fetch("http://127.0.0.1:5000/admin/delete-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        role: localStorage.getItem("role")
      })
    });

    if (response.ok) {
      alert("User deleted successfully");
      setEmail("");
    } else {
      alert("Failed or Unauthorized");
    }
  };

  return (

  <>

   <nav className="navbar">
    <div className="nav-left">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
    </div>
   </nav>
    
    <div className="auth-container">
      <h2>Delete User</h2>

      <input
        type="email"
        placeholder="Enter user email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleDelete}>Delete User</button>
    </div>

 </>
  );
}

export default DeleteUser;