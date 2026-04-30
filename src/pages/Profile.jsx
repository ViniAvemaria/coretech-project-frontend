import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AccountTab from "../components/AccountTab";
import { updateName } from "../api/userService";
import { useOrders } from "../contexts/OrderContext";
import { formatMoney } from "../utils/formatMoney";
import { User, Shield, LogOut, Package, Mail, Trash2 } from "lucide-react";

const Profile = () => {
    const { orders } = useOrders();
    const [editNameLoading, setEditNameLoading] = useState(false);
    const [editName, setEditName] = useState(false);
    const { user, isAuthenticated, logout, refreshUser } = useAuth();
    const [activeTab, setActiveTab] = useState("account");
    const navigate = useNavigate();

    const statusStyles = {
        PENDING: "text-yellow-700 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-600/20",
        PAID: "text-blue-700 bg-blue-100 dark:text-blue-400 dark:bg-blue-600/20",
        SHIPPED: "text-purple-700 bg-purple-100 dark:text-purple-400 dark:bg-purple-600/20",
        DELIVERED: "text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-600/20",
        CANCELLED: "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-600/20",
    };

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

    const handleEditName = async (e) => {
        e.preventDefault();
        setEditNameLoading(true);
        try {
            const payload = {
                firstName: e.target.elements.firstName.value,
                lastName: e.target.elements.lastName.value,
            };
            await updateName(payload);
            setEditName(false);
            refreshUser();
            toast.success("Name edited successfully");
        } catch (err) {
            if (err.response) {
                toast.error(err.response.data?.message || "Failed to edit name");
            } else {
                toast.error("Network error");
            }
        } finally {
            setEditNameLoading(false);
        }
    };

    const formatOrderId = (id) => {
        return String(id).padStart(5, "0");
    };

    return (
        <div className="max-w-[800px] w-full py-12">
            <h2 className="section-title">My Profile</h2>

            {isAuthenticated && (
                <>
                    <div className="flex flex-col gap-7 w-full p-6 rounded-lg border border-border dark:border-border-dark bg-header dark:bg-header-dark text-primary-text dark:text-primary-text-dark">
                        <div className="flex justify-between">
                            <p>Account information</p>
                            {editName ? (
                                <button
                                    onClick={() => {
                                        setEditName(false);
                                    }}
                                    className="cancel-button"
                                >
                                    Cancel
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        setEditName(true);
                                    }}
                                    className="edit-button"
                                >
                                    Edit
                                </button>
                            )}
                        </div>

                        <div className="flex items-center">
                            <div className="flex items-center place-self-start bg-gray-200 dark:bg-gray-700 p-4 rounded-[50%] mr-6">
                                <User size={28} className="text-gray-500 dark:text-gray-400" />
                            </div>
                            {editName ? (
                                <form onSubmit={handleEditName} className="flex flex-col gap-4 w-full max-w-90">
                                    <div>
                                        <label
                                            htmlFor="firstName"
                                            className="text-muted-text-dark dark:text-muted-text"
                                        >
                                            First Name
                                        </label>
                                        <div className="flex border bg-input dark:bg-input-dark border-border dark:border-border-dark px-3 py-1.5 mt-2 rounded-md bg-i rounded-2md focus-within:border-focus-ring transition-colors duration-300 ease">
                                            <input
                                                defaultValue={user.firstName}
                                                id="firstName"
                                                name="firstName"
                                                type="text"
                                                placeholder="Enter your first name"
                                                autoComplete="given-name"
                                                required
                                                className="input-autofill focus:outline-none w-full text-primary-text dark:text-primary-text-dark"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="lastName" className="text-muted-text-dark dark:text-muted-text">
                                            Last Name
                                        </label>
                                        <div className="flex border bg-input dark:bg-input-dark border-border dark:border-border-dark px-3 py-1.5 mt-2 rounded-md bg-i rounded-2md focus-within:border-focus-ring transition-colors duration-300 ease">
                                            <input
                                                defaultValue={user.lastName}
                                                id="lastName"
                                                name="lastName"
                                                type="text"
                                                placeholder="Enter your last name"
                                                autoComplete="family-name"
                                                required
                                                className="input-autofill focus:outline-none w-full text-primary-text dark:text-primary-text-dark"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={editNameLoading}
                                        className={`relative overflow-hidden px-3 py-2 rounded-lg text-white transition-colors duration-300 ease cursor-pointer ${editNameLoading ? "bg-brand/95 cursor-not-allowed" : "bg-brand hover:bg-brand-hover"}`}
                                    >
                                        {editNameLoading && (
                                            <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/35 to-transparent" />
                                        )}
                                        <span className="relative z-10">
                                            {editNameLoading ? "Updating..." : "Update"}
                                        </span>
                                    </button>
                                </form>
                            ) : (
                                <div className="flex flex-col">
                                    <p className="text-muted-text-dark dark:text-muted-text">Name</p>
                                    <p>{`${user.firstName}${user.lastName ? ` ${user.lastName}` : ""}`}</p>
                                </div>
                            )}
                        </div>

                        <hr className="text-muted-text-dark dark:text-muted-text" />
                        <div>
                            <div className="flex items-center text-muted-text-dark dark:text-muted-text">
                                <Mail size={18} className="mr-2" />
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

                    {activeTab === "account" && <AccountTab />}

                    {activeTab === "orders" && (
                        <div>
                            {orders.length === 0 ? (
                                <div className="flex flex-col items-center gap-5 w-full rounded-lg border border-border dark:border-border-dark bg-header dark:bg-header-dark text-primary-text dark:text-primary-text-dark mt-8 px-10 py-12">
                                    <Package size={50} className="text-muted-text-dark dark:text-muted-text" />
                                    <p className="text-primary-text dark:text-primary-text-dark">No orders yet</p>
                                    <p className="text-muted-text-dark dark:text-muted-text">
                                        Your order history will appear here after you complete a purchase.
                                    </p>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4 mt-6 max-h-130 overflow-hidden overflow-y-scroll">
                                    {orders.map((order) => (
                                        <div
                                            key={order.id}
                                            className="grid grid-cols-2 rounded-lg border border-border dark:border-border-dark bg-header dark:bg-header-dark text-primary-text dark:text-primary-text-dark p-4"
                                        >
                                            <div className="flex flex-col gap-1">
                                                <p>{`Order #${formatOrderId(order.id)}`}</p>
                                                <p className="text-muted-text-dark dark:text-muted-text text-sm">
                                                    {new Date(order.createdAt).toLocaleDateString("en-GB", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    })}
                                                </p>
                                                <p>{formatMoney(order.totalPrice)}</p>
                                            </div>

                                            <div className="flex flex-col justify-between items-end-safe">
                                                <p
                                                    className={`${statusStyles[order.status]} w-fit capitalize py-px px-2 rounded-lg`}
                                                >
                                                    {order.status.toLowerCase()}
                                                </p>
                                                <Link
                                                    to={`/order/${order.id}`}
                                                    className="text-brand cursor-pointer py-px px-1.5 tracking-wide hover:underline underline-offset-4"
                                                >
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex flex-col gap-3 w-full px-6 py-8 rounded-lg border border-border dark:border-border-dark bg-header dark:bg-header-dark text-primary-text dark:text-primary-text-dark mt-8">
                        <p className="mb-4">Account Actions</p>
                        {user.roles.includes("ADMIN") && (
                            <Link to={"/admin"}>
                                <button className="action-button bg-purple-600 hover:bg-purple-700">
                                    <Shield size={18} className="mr-2" />
                                    Admin Dashboard
                                </button>
                            </Link>
                        )}
                        <button
                            onClick={() => handleLogout()}
                            className="action-button bg-gray-400 hover:bg-gray-500 dark:bg-gray-500 dark:hover:bg-gray-600"
                        >
                            <LogOut size={18} className="mr-2" />
                            Sign Out
                        </button>
                        {!user.roles.includes("ADMIN") && (
                            <Link to={"/delete-account"}>
                                <button className="action-button bg-red-600 hover:bg-red-700">
                                    <Trash2 size={18} className="mr-2" />
                                    Delete Account
                                </button>
                            </Link>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Profile;
