import { useState } from "react";
import { deleteAccount } from "../api/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleDeleteRequest = async () => {
        setLoading(true);
        try {
            await deleteAccount();
            toast.success("Deletion email sent");
        } catch (err) {
            if (err.response) {
                toast.error(err.response.data?.message || "Failed to send email");
            } else {
                toast.error("Network error");
            }
        } finally {
            setLoading(false);
            navigate("/profile");
        }
    };

    return (
        <div className="max-w-[800px] w-full py-12">
            <div className="flex justify-center text-primary-text dark:text-primary-text-dark">
                <div className="flex flex-col gap-4 text-center bg-header dark:bg-header-dark border border-border dark:border-border-dark rounded-lg p-8 w-fit">
                    <h1 className="text-2xl font-bold mb-6">Delete Account</h1>
                    <p>This action will permanently delete your account and all personal data.</p>
                    <p>Your reviews will remain visible but will no longer be associated with your name.</p>
                    <p>A confirmation link will be sent to your registered email to complete the account deletion.</p>
                    <p>This action cannot be undone.</p>
                    <button
                        onClick={handleDeleteRequest}
                        type="submit"
                        disabled={loading}
                        className={`mt-4 relative overflow-hidden px-3.5 py-2.5 rounded-lg text-white transition-colors duration-300 ease cursor-pointer ${loading ? "bg-red-500/95 dark:bg-red-600/95 cursor-not-allowed" : "bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700"}`}
                    >
                        {loading && (
                            <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/35 to-transparent" />
                        )}
                        <span className="relative z-10">
                            {loading ? "Sending confirmation..." : "Send confirmation"}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccount;
