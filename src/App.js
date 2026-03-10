import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";

import UserDashboard from "./pages/user_dashboard";
import AdminDashboard from "./pages/admin_dashboard";

import ProtectedRoute from "./pages/ProtectedRoute";

import AdminRegister from "./pages/admin_register";
import DeleteUser from "./pages/DeleteUser";
import ViewUsers from "./pages/ViewUsers";
import PredictionLogs from "./pages/PredictionLogs";
import SystemAnalytics from "./pages/SystemAnalytics";
import ManageHotels from "./pages/ManageHotels";

import PredictHotels from "./pages/PredictHotels";

import "./App.css";

function App() {

return (

<Router>

<Routes>

<Route path="/" element={<Login />} />

<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />

<Route
path="/user-dashboard"
element={
<ProtectedRoute allowedRole="user">
<UserDashboard />
</ProtectedRoute>
}
/>

<Route
path="/admin-dashboard"
element={
<ProtectedRoute allowedRole="admin">
<AdminDashboard />
</ProtectedRoute>
}
/>

<Route
path="/predict-hotels"
element={
<ProtectedRoute>
<PredictHotels />
</ProtectedRoute>
}
/>

<Route
path="/admin-register"
element={
<ProtectedRoute allowedRole="admin">
<AdminRegister />
</ProtectedRoute>
}
/>

<Route
path="/admin-delete-user"
element={
<ProtectedRoute allowedRole="admin">
<DeleteUser />
</ProtectedRoute>
}
/>

<Route
path="/admin-users"
element={
<ProtectedRoute allowedRole="admin">
<ViewUsers />
</ProtectedRoute>
}
/>

<Route
path="/admin-logs"
element={
<ProtectedRoute allowedRole="admin">
<PredictionLogs />
</ProtectedRoute>
}
/>

<Route
path="/admin-analytics"
element={
<ProtectedRoute allowedRole="admin">
<SystemAnalytics />
</ProtectedRoute>
}
/>

<Route
path="/admin-hotels"
element={
<ProtectedRoute allowedRole="admin">
<ManageHotels />
</ProtectedRoute>
}

/>

</Routes>

</Router>

);

}

export default App;