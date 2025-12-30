import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import AppRoutes from "./routes/AppRoutes.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import { UserProvider } from "./contexts/UserContex.jsx";

createRoot(document.getElementById("root")).render(
    // <StrictMode>
    <BrowserRouter>
        <ThemeProvider>
            <CartProvider>
                <UserProvider>
                    <ScrollToTop />
                    <AppRoutes />
                </UserProvider>
            </CartProvider>
        </ThemeProvider>
    </BrowserRouter>
    // </StrictMode>
);
