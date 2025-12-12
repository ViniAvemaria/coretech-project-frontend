import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const App = () => {
    return (
        <main className="min-h-screen flex flex-col bg-main dark:bg-main-dark">
            <Header />
            <section className="flex-1">
                <Outlet />
            </section>
            <Footer />
        </main>
    );
};

export default App;
