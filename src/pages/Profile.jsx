import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
    requestEmailChange,
    validateEmailChange,
    requestPasswordChange,
    validatePasswordChange,
} from "../api/authService";
import { updateEmail, upadtePassword } from "../api/userService";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useForm } from "react-hook-form";

const emailSchema = z.object({
    email: z.email(),
});

const passwordSchema = z
    .object({
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

const Profile = () => {
    const [editEmail, setEditEmail] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const [emailCode, setEmailCode] = useState(null);
    const [passwordCode, setPasswordCode] = useState(null);
    const [emailStep, setEmailStep] = useState(null);
    const [passwordStep, setPasswordStep] = useState(null);
    const [emailLoading, setEmailLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);
    const { user, isAuthenticated, logout, refreshUser } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [activeTab, setActiveTab] = useState("account");
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

    const sendChangeCode = async (changeType) => {
        if (changeType === "email") {
            setEmailLoading(true);
            try {
                await requestEmailChange();
                toast.success("Change email code sent");
                setEmailStep("validate");
            } catch (err) {
                if (err.response) {
                    toast.error(err.response.data?.message || "Failed to send code");
                } else {
                    toast.error("Network error");
                }
            } finally {
                setEmailLoading(false);
            }
        } else {
            setPasswordLoading(true);
            try {
                await requestPasswordChange();
                toast.success("Change password code sent");
                setPasswordStep("validate");
            } catch (err) {
                if (err.response) {
                    toast.error(err.response.data?.message || "Failed to send code");
                } else {
                    toast.error("Network error");
                }
            } finally {
                setPasswordLoading(false);
            }
        }
    };

    const validateCode = async (e, changeType) => {
        e.preventDefault();

        if (changeType === "email") {
            setEmailLoading(true);
            const payload = {
                token: e.target.elements.code.value,
            };
            try {
                await validateEmailChange(payload);
                setEmailStep("update");
                setEmailCode(payload.token);
            } catch (err) {
                if (err.response) {
                    toast.error(err.response.data?.message || "Invalid code");
                } else {
                    toast.error("Network error");
                }
            } finally {
                setEmailLoading(false);
            }
        } else {
            setPasswordLoading(true);
            const payload = {
                token: e.target.elements.code.value,
            };
            try {
                await validatePasswordChange(payload);
                setPasswordStep("update");
                setPasswordCode(payload.token);
            } catch (err) {
                if (err.response) {
                    toast.error(err.response.data?.message || "Invalid code");
                } else {
                    toast.error("Network error");
                }
            } finally {
                setPasswordLoading(false);
            }
        }
    };

    const {
        register: registerEmail,
        handleSubmit: handleEmailSubmit,
        formState: { errors: emailErrors },
    } = useForm({ resolver: zodResolver(emailSchema) });

    const {
        register: registerPassword,
        handleSubmit: handlePasswordSubmit,
        formState: { errors: passwordErrors },
    } = useForm({ resolver: zodResolver(passwordSchema) });

    const updateData = async (data, changeType) => {
        if (changeType === "email") {
            setEmailLoading(true);
            try {
                const payload = {
                    token: emailCode,
                    email: data.email,
                };
                await updateEmail(payload);
                toast.success("Email updated successfully");
                refreshUser();
                setEmailCode(null);
                setEmailStep(null);
                setEditEmail(false);
            } catch (err) {
                if (err.response) {
                    toast.error(err.response.data?.message || "Failed to update email");
                } else {
                    toast.error("Network error");
                }
            } finally {
                setEmailLoading(false);
            }
        } else {
            setPasswordLoading(true);
            try {
                const payload = {
                    token: passwordCode,
                    password: data.password,
                };
                await upadtePassword(payload);
                toast.success("Password updated successfully");
                setPasswordCode(null);
                setPasswordStep(null);
                setEditPassword(false);
            } catch (err) {
                if (err.response) {
                    toast.error(err.response.data?.message || "Failed to update password");
                } else {
                    toast.error("Network error");
                }
            } finally {
                setPasswordLoading(false);
            }
        }
    };

    return (
        <div className="max-w-[800px] w-full py-12">
            <h2 className="section-title">My Profile</h2>

            {isAuthenticated && (
                <>
                    <div className="flex flex-col gap-7 w-full p-6 rounded-xl border border-border dark:border-border-dark bg-header dark:bg-header-dark text-primary-text dark:text-primary-text-dark">
                        <p>Account information</p>
                        <div className="flex items-center">
                            <div className="flex items-center bg-gray-200 dark:bg-gray-700 px-4.5 py-4 rounded-[50%] mr-4">
                                <i className="fa-regular fa-user text-2xl text-gray-500 dark:text-gray-400"></i>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-muted-text-dark dark:text-muted-text">Name</p>
                                <p>{`${user.firstName}${user.lastName ? ` ${user.lastName}` : ""}`}</p>
                            </div>
                        </div>
                        <hr className="text-muted-text-dark dark:text-muted-text" />
                        <div>
                            <div className="flex items-center text-muted-text-dark dark:text-muted-text">
                                <i className="fa-regular fa-envelope mr-2"></i>
                                <p>Email Address</p>
                            </div>
                            <p>{user.email}</p>
                        </div>
                    </div>

                    <div className="flex mt-8 justify-between gap-6 text-primary-text dark:text-primary-text-dark">
                        <button
                            onClick={() => setActiveTab("account")}
                            className={activeTab === "account" ? "active-button" : "inactive-button"}
                        >
                            Account
                        </button>
                        <button
                            onClick={() => setActiveTab("orders")}
                            className={activeTab === "orders" ? "active-button" : "inactive-button"}
                        >
                            Orders
                        </button>
                    </div>

                    {activeTab === "account" && (
                        <>
                            <div className="flex flex-col gap-5 w-full p-6 rounded-xl border border-border dark:border-border-dark bg-header dark:bg-header-dark text-primary-text dark:text-primary-text-dark mt-8">
                                <div className="flex items-center justify-between">
                                    <p>Change Email</p>
                                    {editEmail ? (
                                        <button
                                            onClick={() => {
                                                setEditEmail(false);
                                                setEmailStep(null);
                                            }}
                                            className="cancel-button"
                                        >
                                            Cancel
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                setEditEmail(true);
                                                setEmailStep("send");
                                            }}
                                            className="edit-button"
                                        >
                                            Edit
                                        </button>
                                    )}
                                </div>
                                {!editEmail && (
                                    <p className="text-muted-text-dark dark:text-muted-text">
                                        Update your email address to change how you sign in.
                                    </p>
                                )}

                                {emailStep === "send" && (
                                    <div className="flex flex-col gap-6">
                                        <p className="text-muted-text-dark dark:text-muted-text">
                                            To change your email, we will send a 6-digit verification code to your
                                            registered email address. Click Send Code to continue.
                                        </p>

                                        <button
                                            onClick={() => {
                                                sendChangeCode("email");
                                            }}
                                            type="submit"
                                            disabled={emailLoading}
                                            className={`relative overflow-hidden px-3.5 py-2.5 rounded-lg text-white transition-colors duration-300 ease cursor-pointer ${emailLoading ? "bg-brand/95 cursor-not-allowed" : "bg-brand hover:bg-brand-hover"}`}
                                        >
                                            {emailLoading && (
                                                <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/35 to-transparent" />
                                            )}
                                            <span className="relative z-10">
                                                {emailLoading ? "Sending code..." : "Send code"}
                                            </span>
                                        </button>
                                    </div>
                                )}

                                {emailStep === "validate" && (
                                    <form onSubmit={(e) => validateCode(e, "email")} className="flex flex-col gap-6">
                                        <p className="text-muted-text-dark dark:text-muted-text">
                                            Enter the 6-digit verification code we sent to your email.
                                        </p>
                                        <input
                                            id="code"
                                            name="code"
                                            type="text"
                                            inputMode="numeric"
                                            pattern="[0-9]{6}"
                                            placeholder="Code"
                                            autoComplete="one-time-code"
                                            className="input h-10"
                                        />
                                        <button
                                            type="submit"
                                            disabled={emailLoading}
                                            className={`relative overflow-hidden px-3.5 py-2.5 rounded-lg text-white transition-colors duration-300 ease cursor-pointer ${emailLoading ? "bg-brand/95 cursor-not-allowed" : "bg-brand hover:bg-brand-hover"}`}
                                        >
                                            {emailLoading && (
                                                <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/35 to-transparent" />
                                            )}
                                            <span className="relative z-10">
                                                {emailLoading ? "Validating..." : "Validate"}
                                            </span>
                                        </button>
                                    </form>
                                )}

                                {emailStep === "update" && (
                                    <form
                                        onSubmit={handleEmailSubmit((data) => updateData(data, "email"))}
                                        className="flex flex-col gap-6"
                                    >
                                        <div>
                                            <div className="flex border bg-input dark:bg-input-dark border-border dark:border-border-dark px-3 py-1.5 mt-2 rounded-md bg-i rounded-2md focus-within:border-focus-ring transition-colors duration-300 ease">
                                                <input
                                                    id="email"
                                                    type="email"
                                                    {...registerEmail("email")}
                                                    placeholder="Enter your email"
                                                    autoComplete="email"
                                                    className="input-autofill focus:outline-none text-primary-text dark:text-primary-text-dark"
                                                />
                                            </div>
                                            {emailErrors.email && (
                                                <p className="text-red-600 dark:text-red-500 mt-2">
                                                    {emailErrors.email.message}
                                                </p>
                                            )}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={emailLoading}
                                            className={`relative overflow-hidden px-3.5 py-2.5 rounded-lg text-white transition-colors duration-300 ease cursor-pointer ${emailLoading ? "bg-brand/95 cursor-not-allowed" : "bg-brand hover:bg-brand-hover"}`}
                                        >
                                            {emailLoading && (
                                                <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/35 to-transparent" />
                                            )}
                                            <span className="relative z-10">
                                                {emailLoading ? "Updating..." : "Update"}
                                            </span>
                                        </button>
                                    </form>
                                )}
                            </div>

                            <div className="flex flex-col gap-5 w-full p-6 rounded-xl border border-border dark:border-border-dark bg-header dark:bg-header-dark text-primary-text dark:text-primary-text-dark mt-8">
                                <div className="flex items-center justify-between">
                                    <p>Change Password</p>
                                    {editPassword ? (
                                        <button
                                            onClick={() => {
                                                setEditPassword(false);
                                                setPasswordStep(null);
                                            }}
                                            className="cancel-button"
                                        >
                                            Cancel
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                setEditPassword(true);
                                                setPasswordStep("send");
                                            }}
                                            className="edit-button"
                                        >
                                            Edit
                                        </button>
                                    )}
                                </div>
                                {!editPassword && (
                                    <p className="text-muted-text-dark dark:text-muted-text">
                                        Update your password to keep your account secure.
                                    </p>
                                )}

                                {passwordStep === "send" && (
                                    <div className="flex flex-col gap-6">
                                        <p className="text-muted-text-dark dark:text-muted-text">
                                            To change your password, we will send a 6-digit verification code to your
                                            email. Click Send Code to continue.
                                        </p>

                                        <button
                                            onClick={() => {
                                                sendChangeCode("password");
                                            }}
                                            type="submit"
                                            disabled={passwordLoading}
                                            className={`relative overflow-hidden px-3.5 py-2.5 rounded-lg text-white transition-colors duration-300 ease cursor-pointer ${passwordLoading ? "bg-brand/95 cursor-not-allowed" : "bg-brand hover:bg-brand-hover"}`}
                                        >
                                            {passwordLoading && (
                                                <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/35 to-transparent" />
                                            )}
                                            <span className="relative z-10">
                                                {passwordLoading ? "Sending code..." : "Send code"}
                                            </span>
                                        </button>
                                    </div>
                                )}

                                {passwordStep === "validate" && (
                                    <form onSubmit={(e) => validateCode(e, "password")} className="flex flex-col gap-6">
                                        <p className="text-muted-text-dark dark:text-muted-text">
                                            Enter the 6-digit verification code we sent to your email.
                                        </p>
                                        <input
                                            id="code"
                                            name="code"
                                            type="text"
                                            inputMode="numeric"
                                            pattern="[0-9]{6}"
                                            placeholder="Code"
                                            autoComplete="one-time-code"
                                            className="input h-10"
                                        />
                                        <button
                                            type="submit"
                                            disabled={passwordLoading}
                                            className={`relative overflow-hidden px-3.5 py-2.5 rounded-lg text-white transition-colors duration-300 ease cursor-pointer ${passwordLoading ? "bg-brand/95 cursor-not-allowed" : "bg-brand hover:bg-brand-hover"}`}
                                        >
                                            {passwordLoading && (
                                                <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/35 to-transparent" />
                                            )}
                                            <span className="relative z-10">
                                                {passwordLoading ? "Validating..." : "Validate"}
                                            </span>
                                        </button>
                                    </form>
                                )}

                                {passwordStep === "update" && (
                                    <form
                                        onSubmit={handlePasswordSubmit((data) => updateData(data, "password"))}
                                        className="flex flex-col gap-5"
                                    >
                                        <div>
                                            <div className="flex border bg-input dark:bg-input-dark border-border dark:border-border-dark px-3 py-1.5 mt-2 rounded-md bg-i rounded-2md focus-within:border-focus-ring transition-colors duration-300 ease">
                                                <input
                                                    id="password"
                                                    type={showPassword ? "text" : "password"}
                                                    {...registerPassword("password")}
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
                                            {passwordErrors.password && (
                                                <p className="text-red-600 dark:text-red-500 mt-2">
                                                    {passwordErrors.password.message}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex border bg-input dark:bg-input-dark border-border dark:border-border-dark px-3 py-1.5 mt-2 rounded-md bg-i rounded-2md focus-within:border-focus-ring transition-colors duration-300 ease">
                                                <input
                                                    id="confirmPassword"
                                                    type={showPassword ? "text" : "password"}
                                                    {...registerPassword("confirmPassword")}
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
                                            {passwordErrors.confirmPassword && (
                                                <p className="text-red-600 dark:text-red-500 mt-2">
                                                    {passwordErrors.confirmPassword.message}
                                                </p>
                                            )}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={passwordLoading}
                                            className={`relative overflow-hidden mt-2 px-3.5 py-2.5 rounded-lg text-white transition-colors duration-300 ease cursor-pointer ${passwordLoading ? "bg-brand/95 cursor-not-allowed" : "bg-brand hover:bg-brand-hover"}`}
                                        >
                                            {passwordLoading && (
                                                <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/35 to-transparent" />
                                            )}
                                            <span className="relative z-10">
                                                {passwordLoading ? "Updating..." : "Update"}
                                            </span>
                                        </button>
                                    </form>
                                )}
                            </div>
                        </>
                    )}

                    {activeTab === "orders" && (
                        <div className="flex flex-col items-center gap-5 w-full px-10 py-12 rounded-xl border border-border dark:border-border-dark bg-header dark:bg-header-dark text-primary-text dark:text-primary-text-dark mt-8">
                            <i className="fa-solid fa-box text-5xl text-muted-text-dark dark:text-muted-text"></i>
                            <p className="text-primary-text dark:text-primary-text-dark">No orders yet</p>
                            <p className="text-muted-text-dark dark:text-muted-text">
                                Your order history will appear here after you complete a purchase.
                            </p>
                        </div>
                    )}

                    <div className="flex flex-col gap-3 w-full px-6 py-8 rounded-xl border border-border dark:border-border-dark bg-header dark:bg-header-dark text-primary-text dark:text-primary-text-dark mt-8">
                        <p className="mb-4">Account Actions</p>
                        {user.roles.includes("ADMIN") && (
                            <Link to={"/admin"}>
                                <button className="action-button bg-purple-600 hover:bg-purple-700">
                                    <i className="fa-solid fa-shield mr-2 "></i>
                                    Admin Dashboard
                                </button>
                            </Link>
                        )}
                        <button
                            onClick={() => handleLogout()}
                            className="action-button bg-gray-400 hover:bg-gray-500 dark:bg-gray-500 dark:hover:bg-gray-600"
                        >
                            <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>
                            Sign Out
                        </button>
                        {!user.roles.includes("ADMIN") && (
                            <button className="action-button bg-red-600 hover:bg-red-700">
                                <i className="fa-solid fa-trash-can mr-2 "></i>
                                Delete Account
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Profile;
