import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

function ViewUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/admin/users")
      .then(res => res.json())
      .then(data => {
        // ✅ Make sure backend returned an array
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("Unexpected response from backend:", data);
          setUsers([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Fetch error:", error);
        setUsers([]);
        setLoading(false);
      });
  }, []);

  return (

    <>
  <nav className="navbar">
    <div className="nav-left">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
    </div>
  </nav>

  
    <div className="admin-container">
      <h2 className="admin-title">All Registered Users</h2>

      {loading ? (
        <div className="spinner"></div>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${user.role}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  {user.created_at
                    ? new Date(user.created_at).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
 </>

  );
}

export default ViewUsers;