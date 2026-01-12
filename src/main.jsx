import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import AppRoutes from "./routes/AppRoutes.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ProductProvider } from "./contexts/ProductContext.jsx";
import { ReviewProvider } from "./contexts/ReviewContext.jsx";

createRoot(document.getElementById("root")).render(
    // <StrictMode>
    <BrowserRouter>
        <AuthProvider>
            <ThemeProvider>
                <ProductProvider>
                    <CartProvider>
                        <ReviewProvider>
                            <ScrollToTop />
                            <AppRoutes />
                        </ReviewProvider>
                    </CartProvider>
                </ProductProvider>
            </ThemeProvider>
        </AuthProvider>
    </BrowserRouter>
    // </StrictMode>
);
