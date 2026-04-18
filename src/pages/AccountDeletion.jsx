import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { deleteUser } from "../api/userService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ShieldAlert } from "lucide-react";

const AccountDeletion = () => {
    const { setUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const token = params.get("token");
    const id = params.get("id");

    const handleDeletion = async () => {
        setLoading(true);
        try {
            const payload = {
                token: token,
                id: id,
            };
            await deleteUser(payload);
            setUser(null);
            navigate("/account-status?status=deletion-success");
        } catch (err) {
            const status = err.response?.status;
            navigate(status === 404 ? "/account-status?status=not-found" : "/account-status?status=deletion-failure");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-[800px] w-full py-12">
            <div className="flex justify-center text-primary-text dark:text-primary-text-dark">
                <div className="flex flex-col gap-4 text-center bg-header dark:bg-header-dark border border-border dark:border-border-dark rounded-lg p-8 w-fit">
                    <ShieldAlert size={85} className="text-yellow-400 dark:text-yellow-500 mb-6 place-self-center" />
                    <p>
                        You are about to permanently delete your <span translate="no">Core Tech</span> account.
                    </p>
                    <p>This action is irreversible.</p>
                    <button
                        onClick={handleDeletion}
                        type="submit"
                        disabled={loading}
                        className={`mt-4 relative overflow-hidden px-3.5 py-2.5 rounded-lg text-white transition-colors duration-300 ease cursor-pointer ${loading ? "bg-red-500/95 dark:bg-red-600/95 cursor-not-allowed" : "bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700"}`}
                    >
                        {loading && (
                            <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/35 to-transparent" />
                        )}
                        <span className="relative z-10">{loading ? "Deleting account..." : "Delete account"}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccountDeletion;
