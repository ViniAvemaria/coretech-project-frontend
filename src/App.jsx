import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { useTheme } from "./contexts/ThemeContext";

const App = () => {
    const { theme } = useTheme();

    return (
        <main className="min-h-screen flex flex-col bg-main dark:bg-main-dark min-w-[360px]">
            <ToastContainer theme={theme == "dark" ? "dark" : "light"} limit={3} position="top-left" />
            <Header />
            <section className="flex justify-center min-h-dvh flex-1 px-8">
                <Outlet />
                <ScrollToTopButton />
            </section>
            <Footer />
        </main>
    );
};

export default App;
