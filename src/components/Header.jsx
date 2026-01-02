import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useCart } from "../contexts/CartContext";
import { useUser } from "../contexts/UserContex";
import { getTotalItems } from "../utils/cartUtils";
import { handleLogout } from "../api/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const { cartArray } = useCart();
    const { user, removeUser } = useUser();
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <header className="flex justify-between items-center h-20 py-4 px-10 w-full bg-header dark:bg-header-dark gap-10 border-b border-b-border dark:border-b-border-dark">
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
                <ul className="flex gap-8">
                    <li>
                        <button onClick={toggleTheme} className="flex items-center justify-center h-full nav-icons">
                            {theme == "light" ? (
                                <i className="fa-solid fa-moon"></i>
                            ) : (
                                <i className="fa-solid fa-sun"></i>
                            )}
                        </button>
                    </li>
                    <li>
                        <Link to={"/cart"} className="flex items-center justify-center h-full nav-icons relative">
                            {cartArray.length != 0 && (
                                <span className="absolute bg-brand py-0.5 px-1.5 ml-7.5 mb-7.5 text-white text-xs rounded-full">
                                    {getTotalItems(cartArray)}
                                </span>
                            )}
                            <i className="fa-solid fa-cart-shopping"></i>
                        </Link>
                    </li>
                    <li className="relative group">
                        <Link
                            to={"/profile"}
                            className={`flex items-center justify-center h-full nav-icons relative ${
                                user ? "cursor-auto" : ""
                            }`}
                            onClick={(e) => user && e.preventDefault()}
                            state={{ from: location.pathname }}
                        >
                            <i className="fa-solid fa-user"></i>
                        </Link>
                        {user && (
                            <div className="flex flex-col w-60 absolute right-0 text-primary-text dark:text-primary-text-dark bg-card dark:bg-card-dark border border-border rounded-xl dark:border-border-dark opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
                                <div className="flex flex-col px-4 py-3 gap-0.5">
                                    <p className="text-muted-text-dark dark:text-muted-text">Signed in as</p>
                                    <p className="truncate">{`${user.firstName}${
                                        user.lastName ? ` ${user.lastName}` : ""
                                    }`}</p>
                                </div>
                                <hr className="text-muted-text dark:text-muted-text-dark" />
                                <ul className="flex flex-col">
                                    <Link to={"/profile"}>
                                        <li className="flex items-center px-4 py-3 hover:bg-[#f3f4f6] dark:hover:bg-[#111827] transition-colors duration-300 ease cursor-pointer">
                                            <i className="fa-solid fa-user text-sm mr-2"></i>
                                            My Profile
                                        </li>
                                    </Link>
                                    {user.roles.includes("ADMIN") && (
                                        <Link to={"/admin"}>
                                            <li className="flex items-center px-4 py-3 text-purple-600 hover:bg-[#f3f4f6] dark:hover:bg-[#111827] transition-colors duration-300 ease cursor-pointer">
                                                <i className="fa-solid fa-shield text-sm mr-2"></i>
                                                Dashboard
                                            </li>
                                        </Link>
                                    )}
                                    <li className="flex items-center text-red-500 hover:bg-[#f3f4f6] dark:hover:bg-[#111827] transition-colors duration-300 ease rounded-b-xl">
                                        <button
                                            onClick={() => handleLogout({ removeUser, navigate, toast })}
                                            className="flex items-center px-4 py-3 w-full cursor-pointer"
                                        >
                                            <i className="fa-solid fa-arrow-right-from-bracket text-sm mr-2"></i> Sign
                                            out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
