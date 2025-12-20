import { useEffect, useState } from "react";

const ScrollToTopButton = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!visible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 px-3 py-1.5 rounded-full bg-brand text-white shadow-lg hover:bg-brand-hover transition"
            aria-label="Scroll to top"
        >
            <i className="fa-solid fa-arrow-up"></i>
        </button>
    );
};

export default ScrollToTopButton;
