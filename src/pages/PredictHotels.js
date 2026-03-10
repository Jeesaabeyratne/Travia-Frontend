import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

function PredictHotels() {
  const [formData, setFormData] = useState({
    Rooms: "",
    rating: "",
    scenic_view_type: "",
    target_audience: ""
  });

  const [prediction, setPrediction] = useState(null);
  const [predictedDistrict, setPredictedDistrict] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const role = localStorage.getItem("role");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Predict function
  const handlePredict = async () => {
    const user_id = localStorage.getItem("user_id");

    try {
      setLoading(true);
      setError("");
      setPrediction(null);

      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          user_id: user_id,
          Rooms: parseInt(formData.Rooms),
          rating: parseFloat(formData.rating)
        })
      });

      if (!response.ok) throw new Error("Prediction failed");

      const data = await response.json();
      setPrediction(data.prediction);
      setPredictedDistrict(data.district);
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  // Recommend function
  const handleRecommend = async () => {
    if (!prediction) {
      setError("Please click Predict first.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setRecommendations([]);

      const response = await fetch("http://127.0.0.1:5000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenic_view_type: formData.scenic_view_type,
          target_audience: formData.target_audience,
          district: predictedDistrict
        })
      });

      if (!response.ok) throw new Error("Recommendation failed");

      const data = await response.json();
      setRecommendations(data);
    } catch (err) {
      setError("Error fetching recommendations.");
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = async (hotel_id) => {
    try {
      const user_id = localStorage.getItem("user_id");

      const response = await fetch("http://127.0.0.1:5000/user/add-favorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: user_id,
          hotel_id: hotel_id
        })
      });

      const data = await response.json();
      alert(data.message);
    } catch (err) {
      alert("Error adding favorite");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const openMap = (hotel) => {
    const location = hotel.Address + " " + hotel.District;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>

        <div className="nav-right">
          {role === "admin" && (
            <button><Link to="/admin-dashboard">Admin Dashboard</Link></button>
          )}

          {role === "user" && (
            <button><Link to="/user-dashboard">User Dashboard</Link></button>
          )}

          {role && (
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          )}

          {!role && (
            <>
              <button><Link to="/login">Login</Link></button>
              <button><Link to="/register">Register</Link></button>
            </>
          )}
        </div>
      </nav>

      <div className="container">
        <h1>Find Your Ideal Hotel</h1>

        <div className="form-box">
          <input
            type="number"
            name="Rooms"
            placeholder="Number of Rooms"
            value={formData.Rooms}
            onChange={handleChange}
          />

          <input
            type="number"
            step="0.1"
            name="rating"
            placeholder="Hotel Rating (1-5)"
            value={formData.rating}
            onChange={handleChange}
          />

          <select
            name="scenic_view_type"
            value={formData.scenic_view_type}
            onChange={handleChange}
          >
            <option value="">Select Scenic View</option>
            <option value="Sea">Sea</option>
            <option value="City">City</option>
            <option value="Lake">Lakes</option>
            <option value="Hill">Mountains</option>
          </select>

          <select
            name="target_audience"
            value={formData.target_audience}
            onChange={handleChange}
          >
            <option value="">Select Target Audience</option>
            <option value="Couple">Couple</option>
            <option value="Family">Family</option>
            <option value="Business">Business</option>
          </select>

          <div className="button-group">
            <button onClick={handlePredict}>Predict</button>
            <button onClick={handleRecommend}> Recommend
            </button>
          </div>
        </div>

        {loading && <div className="spinner"></div>}
        {error && <div className="error">{error}</div>}

        {predictedDistrict && (
          <div className="result-box">
            <h3>Recommended District:</h3>
            <p>{predictedDistrict}</p>
          </div>
        )}

        {prediction && (
          <div className="result-box">
            <h3>Predicted Hotel Type:</h3>
            <p>{prediction}</p>
          </div>
        )}

        {recommendations.length > 0 && (
          <div className="recommend-box">
            <h3>Recommended Hotels</h3>

            {recommendations.map((hotel) => (
              <div key={hotel.id} className="hotel-card">
                <h4>{hotel.Name}</h4>
                <p>District: {hotel.District}</p>
                <p>Rating: {hotel.rating}</p>

                <div className="hotel-buttons">
                  <button
                    className="fav-btn"
                    onClick={() => addFavorite(hotel.id)}
                  >
                    ❤️ Add to Favorites
                  </button>

                  <button
                    className="map-btn"
                    onClick={() => openMap(hotel)}
                  >
                    📍 Show on Map
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default PredictHotels;