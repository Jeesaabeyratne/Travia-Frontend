import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

function ManageHotels() {
  const [hotels, setHotels] = useState([]);
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  const fetchHotels = () => {
    fetch("http://127.0.0.1:5000/admin/hotels")
      .then(res => res.json())
      .then(data => setHotels(data));
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAdd = async () => {
    await fetch("http://127.0.0.1:5000/admin/add-hotel", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formData)
    });

    setFormData({});
    fetchHotels();
  };

  const handleDelete = async (id) => {
    await fetch(`http://127.0.0.1:5000/admin/delete-hotel/${id}`, {
      method: "DELETE"
    });
    fetchHotels();
  };

  const handleEdit = (hotel) => {
    setEditingId(hotel.id);
    setFormData(hotel);
  };

  const handleUpdate = async () => {
    await fetch(`http://127.0.0.1:5000/admin/update-hotel/${editingId}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formData)
    });

    setEditingId(null);
    setFormData({});
    fetchHotels();
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

    <div className="manage-container">
      <h1>Manage Hotels</h1>

      <div className="hotel-form">
        <input name="Name" placeholder="Hotel Name" value={formData.Name || ""} onChange={handleChange}/>
        <input name="Type" placeholder="Type" value={formData.Type || ""} onChange={handleChange}/>
        <input name="District" placeholder="District" value={formData.District || ""} onChange={handleChange}/>
        <input name="Rooms" placeholder="Rooms" value={formData.Rooms || ""} onChange={handleChange}/>
        <input name="rating" placeholder="Rating" value={formData.rating || ""} onChange={handleChange}/>
        <input name="scenic_view_type" placeholder="Scenic View" value={formData.scenic_view_type || ""} onChange={handleChange}/>
        <input name="target_audience" placeholder="Target Audience" value={formData.target_audience || ""} onChange={handleChange}/>
        <input name="Address" placeholder="Address" value={formData.Address || ""} onChange={handleChange}/>

        {editingId ? (
          <button onClick={handleUpdate}>Update Hotel</button>
        ) : (
          <button onClick={handleAdd}>Add Hotel</button>
        )}
      </div>

      <table className="logs-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>District</th>
            <th>Rating</th>
            <th>Rooms</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map(hotel => (
            <tr key={hotel.id}>
              <td>{hotel.Name}</td>
              <td>{hotel.District}</td>
              <td>{hotel.rating}</td>
              <td>{hotel.Rooms}</td>
              <td>
                <button onClick={() => handleEdit(hotel)}>Edit</button>
                <button onClick={() => handleDelete(hotel.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

 </>
  );
}

export default ManageHotels;