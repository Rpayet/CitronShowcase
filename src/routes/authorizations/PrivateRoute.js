import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"

// Private Route Controller
// Add Admin Route
const PrivateRoute = () => {
    const user = useAuth();
    if (!user.token) return <Navigate to="/login" />;
    return <Outlet />
};

export default PrivateRoute;

