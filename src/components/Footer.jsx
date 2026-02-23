const Footer = () => {
    return (
        <footer className="flex flex-col items-center py-12 px-10 bg-footer dark:bg-footer-dark border-t border-footer-border dark:border-footer-border-dark text-muted-text dark:text-muted-text-dark">
            <section className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-16 w-full justify-items-center-safe max-[1124px]:grid-cols-2 max-[710px]:grid-cols-1">
                <div className="w-80">
                    <h3 translate="no" className="mb-4 text-footer-text">
                        Core Tech
                    </h3>
                    <p>
                        Mock e-commerce project built to showcase frontend and backend skills. Developed by Vinicius de
                        Moura Avemaria
                    </p>
                </div>
                <ul className="flex flex-col gap-2 w-80">
                    <li className="text-footer-text mb-2">Tech Stack</li>
                    <li>React.js + Tailwind CSS</li>
                    <li>Spring Boot (REST API, JWT)</li>
                    <li>PostgreSQL</li>
                    <li>Vercel + Render</li>
                </ul>
                <div className="flex flex-col gap-2 w-80">
                    <p className="text-footer-text mb-2">Links</p>
                    <a href="https://github.com/ViniAvemaria" target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/viniavemaria/" target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </a>
                    <a
                        href="https://github.com/ViniAvemaria/coretech-project-frontend"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Frontend Repo
                    </a>
                    <a
                        href="https://github.com/ViniAvemaria/coretech-project-backend"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Backend Repo
                    </a>
                </div>
            </section>
            <hr className="w-full my-10" />
            <p className="text-center">
                &copy; {new Date().getFullYear()} Vinicius de Moura Avemaria. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
