import { Route, Routes } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import Cart from "../pages/Cart/Cart";
import NotFound from "../pages/NotFound/NotFound";

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<App />}>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
