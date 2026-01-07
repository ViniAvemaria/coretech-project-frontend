import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { useTheme } from "./contexts/ThemeContext";
import { useAuth } from "./contexts/AuthContext";

const App = () => {
    const { loading } = useAuth();
    const { theme } = useTheme();

    return (
        <main className="min-h-screen flex flex-col bg-main dark:bg-main-dark">
            <ToastContainer theme={theme == "dark" ? "dark" : "light"} limit={3} />
            <Header />
            <section className="flex justify-center min-h-dvh flex-1 px-12">
                {loading ? <Loading /> : <Outlet />}
                <ScrollToTopButton />
            </section>
            <Footer />
        </main>
    );
};

export default App;
