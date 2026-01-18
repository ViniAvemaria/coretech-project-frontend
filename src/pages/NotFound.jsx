import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-12 text-primary-text dark:text-primary-text-dark">
            <h1 className="text-brand text-9xl font-semibold font-mono">404</h1>
            <h2 className="text-4xl">Page Not Found!</h2>
            <Link
                to={"/"}
                className="text-white bg-brand rounded-xl px-3 py-1.5 hover:cursor-pointer hover:bg-brand-hover transition-colors duration-300 ease"
            >
                Go back Home
            </Link>
        </div>
    );
};

export default NotFound;
