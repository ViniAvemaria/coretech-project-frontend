import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const Header = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="flex justify-between items-center h-20 py-4 px-10 fixed w-full bg-header dark:bg-header-dark gap-10 border-b border-b-border dark:border-b-border-dark">
            <h1 className="text-brand text-3xl font-bold whitespace-nowrap">Core Tech</h1>
            <div className="group flex items-center w-full max-w-xl border-2 border-border px-4 py-2 rounded-lg gap-3 dark:border-border-dark focus-within:border-focus-ring transition-colors delay-75 ease-linear">
                <i className="fa-solid fa-magnifying-glass text-muted-text dark:text-muted-text-dark group-focus-within:text-focus-ring transition-colors delay-75 ease-linear"></i>
                <input
                    id="search-bar"
                    type="text"
                    placeholder="Search for products..."
                    className="w-full focus:outline-none text-primary-text dark:text-primary-text-dark"
                />
            </div>
            <nav>
                <ul className="flex gap-10">
                    <li className="flex justify-center nav-icons">
                        <button onClick={toggleTheme} className="cursor-pointer">
                            {theme == "light" ? (
                                <i className="fa-solid fa-moon"></i>
                            ) : (
                                <i className="fa-solid fa-sun"></i>
                            )}
                        </button>
                    </li>
                    <li className="nav-icons">
                        <Link to={"/cart"}>
                            <i className="fa-solid fa-cart-shopping"></i>
                        </Link>
                    </li>
                    <li className="nav-icons">
                        <Link to={"/profile"}>
                            <i className="fa-solid fa-user"></i>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
