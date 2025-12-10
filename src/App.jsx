import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const App = () => {
    return (
        <main>
            <Header />
            <section>
                <Outlet />
            </section>
            <Footer />
        </main>
    );
};

export default App;
