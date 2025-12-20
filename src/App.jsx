import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";

const App = () => {
    return (
        <main className="min-h-screen flex flex-col bg-main dark:bg-main-dark">
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
