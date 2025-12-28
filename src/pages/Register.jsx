import { useState } from "react";
import { Link } from "react-router-dom";
import { register as registerUser } from "../api/authService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import z from "zod";

const registerSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data) => {
        try {
            await registerUser(data);
            toast.success("Registered successfully!");
            navigate("/login");
        } catch (err) {
            if (err.response) {
                toast.error(err.response.data?.message || "Registration failed");
            } else {
                toast.error("Network error");
            }
        }
    };

    return (
        <div className="max-w-[425px] w-full py-16">
            <div className="flex flex-col gap-2 w-full h-fit border border-border dark:border-border-dark rounded-2xl p-8 text-primary-text dark:text-primary-text-dark bg-header dark:bg-header-dark">
                <p className="place-self-center">Create Account</p>
                <p className="text-muted-text-dark dark:text-muted-text place-self-center">Sign up to get started</p>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-6 gap-5">
                    <div>
                        <label htmlFor="firstName">First Name</label>
                        <div className="flex border bg-input dark:bg-input-dark border-border dark:border-border-dark px-3 py-1.5 mt-2 rounded-md bg-i rounded-2md focus-within:border-focus-ring transition-colors duration-300 ease">
                            <input
                                id="firstName"
                                type="text"
                                {...register("firstName")}
                                placeholder="Enter your first name"
                                className="input-autofill focus:outline-none w-full text-primary-text dark:text-primary-text-dark"
                            />
                        </div>
                        {errors.firstName && (
                            <p className="text-red-600 dark:text-red-500 mt-2">{errors.firstName.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="lastName">Last Name</label>
                        <div className="flex border bg-input dark:bg-input-dark border-border dark:border-border-dark px-3 py-1.5 mt-2 rounded-md bg-i rounded-2md focus-within:border-focus-ring transition-colors duration-300 ease">
                            <input
                                id="lastName"
                                type="text"
                                {...register("lastName")}
                                placeholder="Enter your last name"
                                className="input-autofill focus:outline-none w-full text-primary-text dark:text-primary-text-dark"
                            />
                        </div>
                        {errors.lastName && (
                            <p className="text-red-600 dark:text-red-500 mt-2">{errors.lastName.message}</p>
                        )}
                    </div>

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
                                placeholder="Create a password"
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
                        className="bg-brand text-white px-3.5 py-2.5 rounded-xl hover:bg-brand-hover transition-colors duration-300 ease cursor-pointer"
                    >
                        Create Account
                    </button>
                </form>
                <p className="text-md text-muted-text-dark dark:text-muted-text text-center mt-6">
                    Already have an account?
                    <Link to={"/login"} className="ml-1 cursor-pointer text-brand">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
