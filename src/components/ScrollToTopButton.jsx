import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

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
            className="fixed bottom-6 right-6 z-50 p-2.5 rounded-full bg-brand text-white shadow-lg hover:bg-brand-hover transition hover:cursor-pointer"
            aria-label="Scroll to top"
        >
            <ArrowUp size={20} />
        </button>
    );
};

export default ScrollToTopButton;
