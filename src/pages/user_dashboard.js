import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

function UserDashboard() {
  const user_id = localStorage.getItem("user_id");
  const navigate = useNavigate();

  const [profile, setProfile] = useState({});
  const [predictions, setPredictions] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [analytics, setAnalytics] = useState({});

  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [message, setMessage] = useState("");

  // =============================
  // LOAD USER DATA
  // =============================

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/user/profile/${user_id}`)
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.log(err));

    fetch(`http://127.0.0.1:5000/user/predictions/${user_id}`)
      .then(res => res.json())
      .then(data => setPredictions(data))
      .catch(err => console.log(err));

    fetch(`http://127.0.0.1:5000/user/favorites/${user_id}`)
      .then(res => res.json())
      .then(data => setFavorites(data))
      .catch(err => console.log(err));

    fetch(`http://127.0.0.1:5000/user/analytics/${user_id}`)
      .then(res => res.json())
      .then(data => setAnalytics(data))
      .catch(err => console.log(err));
  }, [user_id]);

  // =============================
  // UPDATE EMAIL
  // =============================

  const updateEmail = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/user/update-email/${user_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: newEmail })
      });

      const data = await res.json();

      setMessage(data.message);
      setNewEmail("");
    } catch (err) {
      setMessage("Error updating email");
    }
  };

  // =============================
  // CHANGE PASSWORD
  // =============================

  const changePassword = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/user/change-password/${user_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ password: newPassword })
      });

      const data = await res.json();

      setMessage(data.message);
      setNewPassword("");
    } catch (err) {
      setMessage("Error updating password");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // =============================
  // DASHBOARD UI
  // =============================

  return (
    <>
      {/* Navigation Panel */}
      <nav className="admin-nav">
        <div className="nav-brand">
          Travia
        </div>
        <div className="nav-links">
         
          <a href="#" className="nav-link" onClick={() => navigate("/predict-hotels")}>
            Find Hotels
          </a>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-container">
        <h1>User Dashboard</h1>

        {/* PROFILE */}
        <div className="profile-box">
          <h2>Profile Information</h2>
          <p><b>Name:</b> {profile.name}</p>
          <p><b>Email:</b> {profile.email}</p>
        </div>

        {/* UPDATE EMAIL */}
        <div className="update-box">
          <h2>Update Email</h2>
          <input
            type="email"
            placeholder="Enter new email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <button onClick={updateEmail}>
            Update Email
          </button>
        </div>

        {/* CHANGE PASSWORD */}
        <div className="update-box">
          <h2>Change Password</h2>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={changePassword}>
            Change Password
          </button>
        </div>

        {/* SUCCESS MESSAGE */}
        {message && (
          <p className="success-message">
            {message}
          </p>
        )}

        {/* DASHBOARD ACTION CARD */}
        <div className="action-card">
          <h2>Find Your Perfect Hotel</h2>
          <p>
            Use Travia AI to predict the best hotel type and receive
            personalized recommendations based on your preferences.
          </p>
          <Link to="/predict-hotels">
            <button className="predict-btn">
              Start Hotel Prediction
            </button>
          </Link>
        </div>

        {/* PREDICTION HISTORY */}
        <div className="history-box">
          <h2>Your Predictions</h2>
          <table>
            <thead>
              <tr>
                <th>Rooms</th>
                <th>Rating</th>
                <th>View</th>
                <th>Prediction</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((p) => (
                <tr key={p.id}>
                  <td>{p.rooms}</td>
                  <td>{p.rating}</td>
                  <td>{p.scenic_view_type}</td>
                  <td>{p.prediction}</td>
                  <td>{p.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FAVORITE HOTELS */}
        <div className="favorites-box">
          <h2>Your Favorite Hotels</h2>
          {favorites.length === 0 && (
            <p>No favorites yet</p>
          )}
          {favorites.map((hotel) => (
            <div className="hotel-card" key={hotel.id}>
              <h3>{hotel.Name}</h3>
              <p>District: {hotel.District}</p>
              <p>Rating: {hotel.rating}</p>
            </div>
          ))}
        </div>

        {/* USER ANALYTICS */}
        <div className="analytics-box">
          <h2>Your Travel Insight</h2>
          {analytics?.top_view ? (
            <p>
              Most Preferred Scenic View:
              <b> {analytics.top_view.scenic_view_type}</b>
            </p>
          ) : (
            <p>No analytics available yet</p>
          )}
        </div>
      </div>
    </>
  );
}

export default UserDashboard;