import { useUser } from "../contexts/UserContex";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const { user } = useUser();
    return user && user.roles.includes("ADMIN") ? children : <Navigate to="/" />;
};

export default AdminRoute;
