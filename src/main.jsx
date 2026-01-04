import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import AppRoutes from "./routes/AppRoutes.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
    // <StrictMode>
    <BrowserRouter>
        <AuthProvider>
            <ThemeProvider>
                <CartProvider>
                    <ScrollToTop />
                    <AppRoutes />
                </CartProvider>
            </ThemeProvider>
        </AuthProvider>
    </BrowserRouter>
    // </StrictMode>
);
