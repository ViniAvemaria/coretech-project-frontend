import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useCart } from "../contexts/CartContext";
import { getTotalItems } from "../utils/cartUtils";

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const { cartArray } = useCart();
    const location = useLocation();

    return (
        <header className="flex justify-between items-center h-20 py-4 px-10 fixed w-full bg-header dark:bg-header-dark gap-10 border-b border-b-border dark:border-b-border-dark z-100">
            <Link to={"/"}>
                <h1 className="text-brand text-3xl font-bold whitespace-nowrap cursor-pointer hover:scale-105 transition-transform duration-300 ease">
                    Core Tech
                </h1>
            </Link>
            <div className="group flex items-center w-full max-w-xl border-2 bg-input dark:bg-input-dark border-border px-4 py-2 rounded-lg gap-3 dark:border-border-dark focus-within:border-focus-ring transition-colors duration-300 ease">
                <i className="fa-solid fa-magnifying-glass text-muted-text dark:text-muted-text-dark group-focus-within:text-focus-ring transition-colors duration-300 ease"></i>
                <input
                    id="search-bar"
                    type="text"
                    placeholder="Search for products..."
                    className="w-full focus:outline-none text-primary-text dark:text-primary-text-dark"
                />
            </div>
            <nav>
                <ul className="flex gap-9">
                    <li className="flex justify-center nav-icons">
                        <button onClick={toggleTheme} className="flex items-center cursor-pointer">
                            {theme == "light" ? (
                                <i className="fa-solid fa-moon"></i>
                            ) : (
                                <i className="fa-solid fa-sun"></i>
                            )}
                        </button>
                    </li>
                    <li className="nav-icons flex items-center">
                        <Link to={"/cart"}>
                            {cartArray.length != 0 && (
                                <span className="bg-brand py-0.5 px-1.5 text-white text-xs fixed top-4 right-22 rounded-full">
                                    {getTotalItems(cartArray)}
                                </span>
                            )}
                            <i className="fa-solid fa-cart-shopping"></i>
                        </Link>
                    </li>
                    <li className="nav-icons flex items-center">
                        <Link to={"/profile"} state={{ from: location.pathname }}>
                            <i className="fa-solid fa-user"></i>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
