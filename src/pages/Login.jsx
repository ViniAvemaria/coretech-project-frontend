import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="flex items-center justify-center max-w-[425px] w-full">
            <div className="flex flex-col gap-2 w-full h-fit border border-border dark:border-border-dark rounded-2xl p-8 text-primary-text dark:text-primary-text-dark bg-header dark:bg-header-dark">
                <p className="place-self-center">Welcome Back</p>
                <p className="text-muted-text-dark dark:text-muted-text place-self-center">Sign in to your account</p>
                <form action="" className="flex flex-col mt-6 gap-5">
                    <div>
                        <label htmlFor="email" className="block w-fit">
                            Email
                        </label>
                        <div className="flex border bg-input dark:bg-input-dark border-border dark:border-border-dark px-3 py-1.5 mt-2 rounded-md bg-i rounded-2md focus-within:border-focus-ring transition-colors duration-300 ease">
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="focus:outline-none w-full text-primary-text dark:text-primary-text-dark"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block w-fit">
                            Password
                        </label>
                        <div className="flex border bg-input dark:bg-input-dark border-border dark:border-border-dark px-3 py-1.5 mt-2 rounded-md bg-i rounded-2md focus-within:border-focus-ring transition-colors duration-300 ease">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="focus:outline-none w-full text-primary-text dark:text-primary-text-dark"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="flex items-center cursor-pointer w-5 ml-2"
                            >
                                {showPassword ? (
                                    <i className="fa-solid fa-eye-slash"></i>
                                ) : (
                                    <i className="fa-solid fa-eye"></i>
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-brand text-white px-3.5 py-2.5 rounded-xl hover:bg-brand-hover transition-colors duration-300 ease cursor-pointer"
                    >
                        Sign-in
                    </button>
                </form>
                <p className="text-md text-muted-text-dark dark:text-muted-text text-center mt-6">
                    Don't have an account?
                    <Link to={"/register"} className="ml-1 cursor-pointer text-brand">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
