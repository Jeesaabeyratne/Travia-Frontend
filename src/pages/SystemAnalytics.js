import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function SystemAnalytics() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/admin/analytics")
      .then(res => res.json())
      .then(result => setData(result))
      .catch(() => console.log("Error fetching analytics"));
  }, []);

  if (!data) return <div className="spinner"></div>;

  return (

  <>

   <nav className="navbar">
    <div className="nav-left">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
    </div>
  </nav>

    <div className="analytics-container">
      <h1>System Analytics</h1>

      <div className="analytics-grid">

        <div className="analytics-card">
          <h2>{data.total_users}</h2>
          <p>Total Users</p>
        </div>

        <div className="analytics-card">
          <h2>{data.total_admins}</h2>
          <p>Total Admins</p>
        </div>

        <div className="analytics-card">
          <h2>{data.total_hotels}</h2>
          <p>Total Hotels</p>
        </div>

        <div className="analytics-card">
          <h2>{data.total_predictions}</h2>
          <p>Total Predictions</p>
        </div>

        {data.top_prediction && (
          <div className="analytics-card highlight">
            <h3>Most Predicted Type</h3>
            <p>{data.top_prediction.prediction}</p>
          </div>
        )}

        {data.top_view && (
          <div className="analytics-card highlight">
            <h3>Most Popular Scenic View</h3>
            <p>{data.top_view.scenic_view_type}</p>
          </div>
        )}

      </div>
    </div>
  </>
  );
}

export default SystemAnalytics;