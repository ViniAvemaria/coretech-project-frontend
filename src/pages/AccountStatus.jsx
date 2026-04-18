import { useSearchParams, Link } from "react-router-dom";
import { Shield, ShieldQuestionMark, ShieldCheck, ShieldX, ShieldOff } from "lucide-react";

const AccountStatus = () => {
    const [searchParams] = useSearchParams();
    const status = searchParams.get("status");
    const statusMap = {
        "confirmation-success": {
            title: "Account Activated!",
            message: "You can now log in to your Core Tech account",
            icon: <ShieldCheck size={85} className="text-green-500" />,
        },
        "confirmation-failure": {
            title: "Invalid or Expired Link",
            message: "This confirmation link is no longer valid",
            icon: <ShieldX size={85} className="text-red-500" />,
        },
        "resend-success": {
            title: "Activation Email Sent!",
            message: "Check your email for the new activation link",
            icon: <ShieldCheck size={85} className="text-green-500" />,
        },
        "resend-failure": {
            title: "No Email Sent",
            message: "Your account is already activated or you still have a valid activation link",
            icon: <ShieldX size={85} className="text-red-500" />,
        },
        "deletion-success": {
            title: "Account Deleted",
            message: "Your account has been permanently removed",
            icon: <ShieldCheck size={85} className="text-green-500" />,
        },
        "deletion-failure": {
            title: "Invalid or Expired Link",
            message: "This deletion link is no longer valid",
            icon: <ShieldX size={85} className="text-red-500" />,
        },
        "not-found": {
            title: "Link not Found",
            message: "This link was not found in our database",
            icon: <ShieldOff size={85} className="text-brand" />,
        },
    };

    const { title, message, icon } = statusMap[status] || {
        title: "Unknown Status",
        message: "An unknown status occurred",
        icon: <ShieldQuestionMark size={85} className="text-brand" />,
    };

    return (
        <div className="max-w-[425px] w-full py-12">
            <div className="flex justify-center items-center text-primary-text dark:text-primary-text-dark">
                <div className="flex flex-col items-center bg-header dark:bg-header-dark border border-border dark:border-border-dark rounded-lg p-10">
                    {icon}
                    <h1 className="text-center font-semibold text-xl mt-10 mb-4">{title}</h1>
                    <h2 className="text-center text-muted-text-dark dark:text-muted-text">{message}</h2>
                    {status == "confirmation-success" && (
                        <Link
                            to={"/login"}
                            className="mt-6 text-brand hover:text-brand-hover transition-colors duration-300 ease cursor-pointer"
                        >
                            Go to Login Page
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AccountStatus;
