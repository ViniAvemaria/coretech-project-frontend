import { useEffect } from "react";
import api from "./api/api";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    useEffect(() => {
        api.post("/auth/refresh-token")
            .then((res) => sessionStorage.setItem("accessToken", res.data.accessToken))
            .catch(() => sessionStorage.removeItem("accessToken"));
    }, []);

    return (
        <main className="min-h-screen flex flex-col bg-main dark:bg-main-dark">
            <ToastContainer />
            <Header />
            <section className="flex justify-center min-h-dvh flex-1 mt-20">
                <Outlet />
                <ScrollToTopButton />
            </section>
            <Footer />
        </main>
    );
};

export default App;
