import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const { user, isAuthenticated } = useAuth();
    return isAuthenticated && user.roles.includes("ADMIN") ? children : <Navigate to="/" />;
};

export default AdminRoute;
