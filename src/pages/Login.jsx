import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import z from "zod";

const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await login(data);
            toast.success("Login Successful");
        } catch (err) {
            if (err.response) {
                toast.error(err.response.data?.message || "Login failed");
            } else {
                toast.error("Network error");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-[425px] w-full py-12">
            <div className="flex flex-col gap-2 w-full h-fit border border-border dark:border-border-dark rounded-xl p-8 text-primary-text dark:text-primary-text-dark bg-header dark:bg-header-dark">
                <p className="place-self-center">Welcome Back</p>
                <p className="text-muted-text-dark dark:text-muted-text place-self-center">Sign in to your account</p>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-6 gap-5">
                    <div>
                        <label htmlFor="email" className="block w-fit">
                            Email
                        </label>
                        <div className="flex border bg-input dark:bg-input-dark border-border dark:border-border-dark px-3 py-1.5 mt-2 rounded-md bg-i rounded-2md focus-within:border-focus-ring transition-colors duration-300 ease">
                            <input
                                id="email"
                                type="email"
                                {...register("email")}
                                placeholder="Enter your email"
                                autoComplete="email"
                                className="input-autofill focus:outline-none w-full text-primary-text dark:text-primary-text-dark"
                            />
                        </div>
                        {errors.email && <p className="text-red-600 dark:text-red-500 mt-2">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block w-fit">
                            Password
                        </label>
                        <div className="flex border bg-input dark:bg-input-dark border-border dark:border-border-dark px-3 py-1.5 mt-2 rounded-md bg-i rounded-2md focus-within:border-focus-ring transition-colors duration-300 ease">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                {...register("password")}
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                className="input-autofill focus:outline-none w-full text-primary-text dark:text-primary-text-dark"
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
                        {errors.password && (
                            <p className="text-red-600 dark:text-red-500 mt-2">{errors.password.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`relative overflow-hidden px-3.5 py-2.5 rounded-xl text-white transition-colors duration-300 ease cursor-pointer ${loading ? "bg-brand/95 cursor-not-allowed" : "bg-brand hover:bg-brand-hover"}`}
                    >
                        {loading && (
                            <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/35 to-transparent" />
                        )}
                        <span className="relative z-10">{loading ? "Signing in..." : "Sign in"}</span>
                    </button>
                </form>
                <p className="text-md text-muted-text-dark dark:text-muted-text text-center mt-6">
                    Don't have an account?
                    <Link to={"/register"} className="ml-1 cursor-pointer text-brand">
                        Register
                    </Link>
                </p>

                <p className="text-md text-muted-text-dark dark:text-muted-text text-center">
                    Forgot your password?
                    <Link to={"/recover-password"} className="ml-1 cursor-pointer text-brand">
                        Reset it
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
