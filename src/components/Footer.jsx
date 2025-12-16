const Footer = () => {
    return (
        <footer className="flex flex-col items-center py-12 px-10 bg-footer dark:bg-footer-dark border-t border-footer-border dark:border-footer-border-dark text-muted-text dark:text-muted-text-dark">
            <section className="grid grid-cols-3 gap-16">
                <div className="w-[80%]">
                    <h3 className="mb-4 text-footer-text">Core Tech</h3>
                    <p>Your trusted destination for the latest electronics and tech gadgets.</p>
                </div>
                <ul className="flex flex-col gap-2">
                    <li className="text-footer-text mb-2">Contact Us</li>
                    <li>
                        <i className="fa-solid fa-envelope mr-2"></i>
                        support@coretech.com
                    </li>
                    <li>
                        <i className="fa-solid fa-phone mr-2"></i>
                        +1 (234) 567-890
                    </li>
                    <li>
                        <i className="fa-solid fa-location-dot mr-2"></i>
                        123 Tech Street, San Francisco, CA 94102
                    </li>
                </ul>
                <ul className="flex flex-col gap-2">
                    <li className="text-footer-text mb-2">Quick Links</li>
                    <li>About Us</li>
                    <li>Privacy Policy</li>
                    <li>Terms of Service</li>
                    <li>Shipping & Returns</li>
                </ul>
            </section>
            <hr className="w-full my-10" />
            <p>&copy; {new Date().getFullYear()} Core Tech. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
