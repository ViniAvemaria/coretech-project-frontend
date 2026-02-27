import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Loading from "../components/Loading";

const AdminRoute = ({ children }) => {
    const { user, isAuthenticated, loading } = useAuth();
    if (loading)
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loading />
            </div>
        );
    return isAuthenticated && user.roles.includes("ADMIN") ? children : <Navigate to="/" />;
};

export default AdminRoute;
