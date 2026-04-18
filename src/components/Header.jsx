import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useProducts } from "../contexts/ProductContext";
import { toast } from "react-toastify";
import { ShoppingCart, User, Moon, Sun, Shield, LogOut, Menu, X, Search as Magnifying } from "lucide-react";

const Header = () => {
    const searchRef = useRef(null);
    const [profileOpen, setProfileOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const { search, setSearch } = useProducts();
    const { user, isAuthenticated, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { itemCount } = useCart();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        navigate("/");
        try {
            await logout();
            toast.success("Sign out Successful");
        } catch (err) {
            if (err.response) {
                toast.error(err.response.data?.message || "Sign out failed");
            } else {
                toast.error("Network error");
            }
        }
    };

    useEffect(() => {
        if (searchOpen) {
            searchRef.current?.focus();
        }
    }, [searchOpen]);

    return (
        <header className="flex items-center h-18 py-4 px-10 max-[550px]:pr-6 w-full bg-header dark:bg-header-dark max-[550px]:gap-8 gap-12 border-b border-b-border dark:border-b-border-dark">
            {!searchOpen && (
                <Link to={"/"}>
                    <h1
                        translate="no"
                        className="text-brand text-3xl font-bold whitespace-nowrap cursor-pointer hover:scale-105 transition-transform duration-300 ease"
                    >
                        Core Tech
                    </h1>
                </Link>
            )}

            <div
                onBlur={() => setSearchOpen(false)}
                className={`ml-auto ${searchOpen ? "max-[550px]:visible" : "max-[550px]:hidden"} group flex items-center w-full max-w-xl border bg-input dark:bg-input-dark border-border px-4 py-2 rounded-3xl gap-3 dark:border-border-dark focus-within:border-focus-ring transition-colors duration-300 ease`}
            >
                <Magnifying
                    size={18}
                    className="text-muted-text dark:text-muted-text-dark group-focus-within:text-focus-ring transition-colors duration-300 ease"
                />

                <input
                    ref={searchRef}
                    id="search-bar"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    autoComplete="off"
                    placeholder="Search for products..."
                    className="w-full focus:outline-none text-primary-text dark:text-primary-text-dark"
                />
                <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                        setSearch("");
                    }}
                    className="text-muted-text dark:text-muted-text-dark group-focus-within:text-focus-ring transition-colors duration-300 ease text-sm cursor-pointer"
                >
                    {search && <X size={18} />}
                </button>
            </div>

            <div className="min-[850px]:hidden ml-auto flex gap-4">
                <button
                    onClick={() => setSearchOpen(true)}
                    className={`flex items-center justify-center ${searchOpen ? "max-[550px]:hidden" : "min-[550px]:hidden"} text-primary-text dark:text-primary-text-dark nav-icons`}
                >
                    <Magnifying size={18} />
                </button>

                <button
                    className="flex items-center justify-center min-[850px]:hidden nav-icons"
                    onClick={() => setOpen(true)}
                >
                    <Menu />
                </button>
            </div>

            <nav className="max-[850px]:hidden ml-auto">
                <ul className="flex gap-8">
                    <li>
                        <button onClick={toggleTheme} className="flex items-center justify-center h-full nav-icons">
                            {theme == "light" ? <Moon /> : <Sun />}
                        </button>
                    </li>
                    <li>
                        <Link to={"/cart"} className="flex items-center justify-center h-full nav-icons relative">
                            {itemCount > 0 && (
                                <span className="absolute bg-brand py-0.5 px-1.5 ml-7.5 mb-7.5 text-white text-xs rounded-full">
                                    {itemCount}
                                </span>
                            )}
                            <ShoppingCart />
                        </Link>
                    </li>
                    <li className="relative group">
                        <Link
                            to={isAuthenticated ? "/profile" : "/login"}
                            className="flex items-center justify-center h-full nav-icons relative cursor-pointer"
                            onClick={(e) => {
                                if (isAuthenticated) e.preventDefault();
                                setProfileOpen((prev) => !prev);
                            }}
                            state={{ from: location.pathname }}
                            onBlur={() =>
                                setTimeout(() => {
                                    setProfileOpen(false);
                                }, 100)
                            }
                        >
                            <User />
                        </Link>
                        {isAuthenticated && (
                            <div
                                className={`absolute right-0 w-60 z-10 text-primary-text dark:text-primary-text-dark bg-main dark:bg-header-dark border border-border dark:border-border-dark rounded-lg transition-opacity duration-300 ${profileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                            >
                                <div className="flex flex-col px-4 py-3 gap-0.5">
                                    <p className="text-muted-text-dark dark:text-muted-text">Signed in as</p>
                                    <p className="truncate">{`${user.firstName}${
                                        user.lastName ? ` ${user.lastName}` : ""
                                    }`}</p>
                                </div>
                                <hr className="border-border dark:border-border-dark" />
                                <ul className="flex flex-col">
                                    <Link to={"/profile"}>
                                        <li className="flex items-center px-4 py-3 hover:bg-gray-200 dark:hover:bg-[#374151] transition-colors duration-300 ease cursor-pointer">
                                            <User size={18} className="mr-2" />
                                            Profile
                                        </li>
                                    </Link>
                                    {user.roles.includes("ADMIN") && (
                                        <Link to={"/admin"}>
                                            <li className="flex items-center px-4 py-3 text-purple-600 hover:bg-gray-200 dark:hover:bg-[#374151] transition-colors duration-300 ease cursor-pointer">
                                                <Shield size={18} className="mr-2" />
                                                Dashboard
                                            </li>
                                        </Link>
                                    )}
                                    <li className="flex items-center text-red-500 hover:bg-gray-200 dark:hover:bg-[#374151] transition-colors duration-300 ease rounded-b-lg">
                                        <button
                                            onClick={() => handleLogout()}
                                            className="flex items-center px-4 py-3 w-full cursor-pointer"
                                        >
                                            <LogOut size={18} className="mr-2" />
                                            Sign out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </li>
                </ul>
            </nav>

            {open && (
                <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={() => setOpen(false)}></div>
            )}

            <nav
                className={`${open ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none translate-x-full"} fixed top-0 right-0 z-100  transition-transform-opacity duration-300 ease`}
            >
                <ul className="flex flex-col w-[250px] h-dvh text-primary-text dark:text-primary-text-dark bg-header dark:bg-header-dark border-l border-border dark:border-border-dark">
                    <li className="border-b border-muted-text dark:border-border-dark">
                        <button
                            className="flex items-center gap-3 w-full p-6 cursor-pointer hover:bg-gray-300 hover:dark:bg-card-dark transition-colors duration-300 ease"
                            onClick={() => setOpen(false)}
                        >
                            <X size={18} />
                            Close
                        </button>
                    </li>
                    <li className="border-b border-muted-text dark:border-border-dark">
                        <Link to={"/profile"}>
                            <button
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-3 w-full p-6 cursor-pointer hover:bg-gray-300 hover:dark:bg-card-dark transition-colors duration-300 ease"
                            >
                                <User size={18} />
                                Profile
                            </button>
                        </Link>
                    </li>
                    <li className="border-b border-muted-text dark:border-border-dark">
                        <Link to={"/cart"}>
                            <button
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-3 w-full p-6 cursor-pointer hover:bg-gray-300 hover:dark:bg-card-dark transition-colors duration-300 ease"
                            >
                                {itemCount > 0 && (
                                    <span className="absolute bg-brand py-0.5 px-1.5 ml-2.5 mb-6 text-white text-xs rounded-full">
                                        {itemCount}
                                    </span>
                                )}
                                <ShoppingCart size={18} />
                                Cart
                            </button>
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={toggleTheme}
                            className="flex items-center gap-3 w-full p-6 cursor-pointer hover:bg-gray-300 hover:dark:bg-card-dark transition-colors duration-300 ease"
                        >
                            {theme == "light" ? <Moon size={18} /> : <Sun size={18} />}

                            <p>Theme</p>
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
