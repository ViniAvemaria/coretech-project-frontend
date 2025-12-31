import { useState } from "react";
import { useUser } from "../contexts/UserContex";
import { handleLogout } from "../api/authService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [activeTab, setActiveTab] = useState("account");
    const { user, removeUser } = useUser();
    const navigate = useNavigate();

    return (
        <div className="max-w-[800px] w-full">
            <h2 className="section-title">My Profile</h2>
        
            {user && (
                <>
                    <div className="flex flex-col gap-8 w-full p-6 rounded-xl border border-border dark:border-border-dark bg-header dark:bg-header-dark text-primary-text dark:text-primary-text-dark">
                        <p>Account information</p>
                        <div className="flex items-center">
                            <div className="flex items-center bg-gray-200 dark:bg-gray-700 px-4.5 py-4 rounded-[50%] mr-4">
                                <i className="fa-regular fa-user text-2xl text-gray-500 dark:text-gray-400"></i>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-main-dark dark:text-muted-text">Name</p>
                                <p>{`${user.firstName}${user.lastName ? ` ${user.lastName}` : ""}`}</p>
                            </div>
                        </div>
                        <hr className="text-main-dark dark:text-muted-text" />
                        <div>
                            <div className="flex items-center text-main-dark dark:text-muted-text">
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
                                    <button className="edit-button">Edit</button>
                                </div>
                                <p className="text-main-dark dark:text-muted-text">
                                    Update your email address to change how you sign in.
                                </p>
                            </div>

                            <div className="flex flex-col gap-5 w-full p-6 rounded-xl border border-border dark:border-border-dark bg-header dark:bg-header-dark text-primary-text dark:text-primary-text-dark mt-8">
                                <div className="flex items-center justify-between">
                                    <p>Change Password</p>
                                    <button className="edit-button">Edit</button>
                                </div>
                                <p className="text-main-dark dark:text-muted-text">
                                    Update your password to keep your account secure.
                                </p>
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

                    <div className="flex flex-col gap-5 w-full px-6 py-8 rounded-xl border border-border dark:border-border-dark bg-header dark:bg-header-dark text-primary-text dark:text-primary-text-dark mt-8">
                        <p>Account Actions</p>
                        {user.roles.includes("ADMIN") && (
                            <Link to={"/admin"}>
                                <button className="action-button bg-purple-600 hover:bg-purple-700">
                                    <i className="fa-solid fa-shield mr-2 "></i>
                                    Admin Dashboard
                                </button>
                            </Link>
                        )}
                        <button
                            onClick={() => handleLogout({ removeUser, navigate, toast })}
                            className="action-button bg-gray-500 hover:bg-gray-600"
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
