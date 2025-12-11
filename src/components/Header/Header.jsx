import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";

const Header = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="flex justify-between items-center h-20 py-4 px-10 bg-header dark:bg-header-dark">
            <h1 className="text-brand">Core Tech</h1>
            <input id="search-bar" type="text" placeholder="Search" />
            <nav>
                <ul className="flex gap-5">
                    <li className="flex justify-center w-4">
                        <button onClick={toggleTheme} className="">
                            {theme == "light" ? (
                                <i className="fa-solid fa-moon text text-primary-text "></i>
                            ) : (
                                <i className="fa-solid fa-sun text-text-dark"></i>
                            )}
                        </button>
                    </li>
                    <li className="w-4">
                        <Link to={"/cart"}>
                            <i className="fa-solid fa-cart-shopping text-primary-text dark:text-text-dark"></i>
                        </Link>
                    </li>
                    <li className="w-4">
                        <Link to={"/profile"}>
                            <i className="fa-solid fa-user text-primary-text dark:text-text-dark"></i>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
