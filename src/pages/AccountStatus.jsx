import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

const AccountStatus = () => {
    const [searchParams] = useSearchParams();
    const status = searchParams.get("status");
    const statusMap = {
        "confirmation-success": {
            title: "Account Activated!",
            message: "You can now log in to your Core Tech account",
            icon: <i className="fa-solid fa-check text-green-500 text-7xl"></i>,
        },
        "confirmation-failure": {
            title: "Invalid Activation Link",
            message: "This link has already been used, expired, or is invalid",
            icon: <i className="fa-solid fa-x text-red-500 text-6xl"></i>,
        },
        "resend-success": {
            title: "Activation Email Sent!",
            message: "Check your email for the new activation link",
            icon: <i className="fa-solid fa-check text-green-500 text-7xl"></i>,
        },
        "resend-failure": {
            title: "No Email Sent",
            message: "Your account is already activated or you still have a valid activation link",
            icon: <i className="fa-solid fa-x text-red-500 text-6xl"></i>,
        },
        "not-found": {
            title: "Confirmation Link not Found",
            message: "The token in the link was not found in our database",
            icon: <h1 className="text-brand text-7xl font-semibold font-mono">404</h1>,
        },
    };

    const { title, message, icon } = statusMap[status] || {
        title: "Unknown Status",
        message: "An unknown status occurred",
        icon: <i className="fa-regular fa-circle-question text-brand text-7xl"></i>,
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
