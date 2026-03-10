import "./style.css";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here
    navigate("/login");
  };

  return (
    <>
      {/* Navigation Panel */}
      <nav className="admin-nav">
        <div className="nav-brand">
          Travia
        </div>
        <div className="nav-links">
          <a href="#" className="nav-link" onClick={() => navigate("/admin-analytics")}>
            Analytics
          </a>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Main Admin Container */}
      <div className="admin-container">
        <h1 className="admin-title">Admin Dashboard</h1>

        <div className="card-grid">
          {/* CARD 1 */}
          <div className="admin-card" onClick={() => navigate("/admin-register")}>
            <h2>Register Users</h2>
            <p>Create new Admin or User accounts</p>
          </div>

          {/* CARD 2 */}
          <div className="admin-card" onClick={() => navigate("/admin-users")}>
            <h2>View Users</h2>
            <p>See all registered system users</p>
          </div>

          {/* CARD 3 - NEW HOTEL PREDICTION CARD */}
          <div className="admin-card" onClick={() => navigate("/predict-hotels")}>
            <h2>Hotel Prediction</h2>
            <p>Predict suitable hotels using ML model</p>
          </div>

          {/* CARD 4 */}
          <div className="admin-card" onClick={() => navigate("/admin-hotels")}>
            <h2>Manage Hotels</h2>
            <p>View and manage hotel database</p>
          </div>

          {/* CARD 5 */}
          <div className="admin-card" onClick={() => navigate("/admin-logs")}>
            <h2>Prediction Logs</h2>
            <p>Check ML prediction history</p>
          </div>

          {/* CARD 6 */}
          <div className="admin-card" onClick={() => navigate("/admin-analytics")}>
            <h2>System Analytics</h2>
            <p>View usage and system insights</p>
          </div>

          {/* CARD 7 */}
          <div className="admin-card delete-card" onClick={() => navigate("/admin-delete-user")}>
            <h2>Delete Users</h2>
            <p>Remove users from the system database</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;