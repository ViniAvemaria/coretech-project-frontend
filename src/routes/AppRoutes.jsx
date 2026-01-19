import { Route, Routes } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Cart from "../pages/Cart";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Product from "../pages/Product";
import AdminDashboard from "../pages/AdminDashboard";
import AccountStatus from "../pages/AccountStatus";
import RecoverPassword from "../pages/RecoverPassword";
import ResetPassword from "../pages/ResetPassword";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import PublicRoute from "./PublicRoute";

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<App />}>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/account-status" element={<AccountStatus />} />
                <Route path="/recover-password" element={<RecoverPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <ProtectedRoute>
                            <Cart />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin"
                    element={
                        <AdminRoute>
                            <AdminDashboard />
                        </AdminRoute>
                    }
                />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
