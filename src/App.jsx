import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { useTheme } from "./contexts/ThemeContext";
import { useUser } from "./contexts/UserContex";
import { userInfo } from "./api/userService";
import { refresh } from "./api/authService";

const App = () => {
    const { saveUser, removeUser } = useUser();
    const { theme } = useTheme();

    useEffect(() => {
        const init = async () => {
            try {
                const refreshRes = await refresh();
                const token = refreshRes.data.data.accessToken;
                sessionStorage.setItem("accessToken", token);

                const userRes = await userInfo(token);
                saveUser(userRes.data.data);
            } catch {
                removeUser();
            }
        };

        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <main className="min-h-screen flex flex-col bg-main dark:bg-main-dark">
            <ToastContainer theme={theme == "dark" ? "dark" : "light"} />
            <Header />
            <section className="flex justify-center min-h-dvh flex-1 p-16">
                <Outlet />
                <ScrollToTopButton />
            </section>
            <Footer />
        </main>
    );
};

export default App;
