import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function PredictionLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/admin/prediction-logs")
      .then(res => res.json())
      .then(data => {
        setLogs(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch logs");
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

    <div className="logs-container">
      <h1>Prediction Logs</h1>

      {loading && <div className="spinner"></div>}
      {error && <p className="error">{error}</p>}

      {!loading && logs.length === 0 && (
        <p>No prediction logs found.</p>
      )}

      {!loading && logs.length > 0 && (
        <div className="logs-table-wrapper">
          <table className="logs-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Rooms</th>
                <th>Rating</th>
                <th>Scenic View</th>
                <th>District</th>
                <th>Target Audience</th>
                <th>Prediction</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => (
                <tr key={log.id}>
                  <td>{log.id}</td>
                  <td>{log.rooms}</td>
                  <td>{log.rating}</td>
                  <td>{log.scenic_view_type}</td>
                  <td>{log.district}</td>
                  <td>{log.target_audience}</td>
                  <td>{log.prediction}</td>
                  <td>{new Date(log.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>

</>
  );
}

export default PredictionLogs;