import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { resetPassword } from "../api/authService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const passwordSchema = z
    .object({
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const status = searchParams.get("status");
    const token = searchParams.get("token");
    const id = searchParams.get("id");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const statusMap = {
        success: {
            title: "Reset your password",
            message: "Enter your new password below",
            icon: null,
        },
        failure: {
            title: "Invalid Recovery Link",
            message: "This link has already been used, expired, or is invalid",
            icon: <i className="fa-solid fa-x text-red-500 text-6xl place-self-center"></i>,
        },
        "not-found": {
            title: "Recovery link not found",
            message: "The token in the link was not found in our database",
            icon: <h1 className="text-brand text-7xl font-semibold font-mono text-center">404</h1>,
        },
    };

    const { title, message, icon } = statusMap[status] || {
        title: "Unknown Status",
        message: "An unknown status occurred.",
        icon: <i className="fa-regular fa-circle-question text-brand text-7xl place-self-center"></i>,
    };

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(passwordSchema) });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const { password } = data;
            await resetPassword(token, id, password);
            toast.success("Password reset successfully");
            navigate("/login");
        } catch (err) {
            if (err.response) {
                toast.error(err.response.data?.message || "Failed to reset password");
            } else {
                toast.error("Network error");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-[425px] w-full py-12">
            <div className="flex flex-col border border-border dark:border-border-dark rounded-lg p-8 text-primary-text dark:text-primary-text-dark bg-header dark:bg-header-dark">
                {icon}
                <h1 className={`text-center font-semibold text-xl mb-4 ${status != "success" && "mt-10"}`}>{title}</h1>
                <h2 className="text-center text-muted-text-dark dark:text-muted-text">{message}</h2>

                {status == "success" && (
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mt-6">
                        <div>
                            <div className="flex border bg-input dark:bg-input-dark border-border dark:border-border-dark px-3 py-1.5 mt-2 rounded-md bg-i rounded-2md focus-within:border-focus-ring transition-colors duration-300 ease">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    {...register("password")}
                                    placeholder="New password"
                                    autoComplete="new-password"
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
                        <div>
                            <div className="flex border bg-input dark:bg-input-dark border-border dark:border-border-dark px-3 py-1.5 mt-2 rounded-md bg-i rounded-2md focus-within:border-focus-ring transition-colors duration-300 ease">
                                <input
                                    id="confirmPassword"
                                    type={showPassword ? "text" : "password"}
                                    {...register("confirmPassword")}
                                    placeholder="Confirm password"
                                    autoComplete="off"
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
                            {errors.confirmPassword && (
                                <p className="text-red-600 dark:text-red-500 mt-2">{errors.confirmPassword.message}</p>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`relative overflow-hidden px-3.5 py-2.5 rounded-lg text-white transition-colors duration-300 ease cursor-pointer ${loading ? "bg-brand/95 cursor-not-allowed" : "bg-brand hover:bg-brand-hover"}`}
                        >
                            {loading && (
                                <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/35 to-transparent" />
                            )}
                            <span className="relative z-10">{loading ? "Submitting..." : "Submit"}</span>
                        </button>
                    </form>
                )}

                {status != "success" && (
                    <Link
                        to={"/login"}
                        className="mt-6 text-brand hover:text-brand-hover transition-colors duration-300 ease cursor-pointer place-self-center"
                    >
                        Go to Login Page
                    </Link>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;
