import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
        return <Navigate to="/profile" replace />;
    }
    return children;
};

export default PublicRoute;
