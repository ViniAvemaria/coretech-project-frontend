const ImportConflictsModal = ({ existingProducts, setExistingProducts }) => {
    return (
        <div className="flex items-center justify-center fixed inset-0 bg-black/75 px-16">
            <div className="flex flex-col max-w-150 text-primary-text dark:text-primary-text-dark px-6 py-8 bg-header dark:bg-header-dark border border-border dark:border-border-dark rounded-xl max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between">
                    <h2 className="section-title mb-0">{`Existing products (${existingProducts.length})`}</h2>
                    <button
                        onClick={() => setExistingProducts([])}
                        className="place-self-center py-1 px-2.5 hover:bg-edit-hover dark:hover:bg-edit-hover-dark text-white transition-colors duration-300 ease cursor-pointer rounded-lg"
                    >
                        <i className="fa-solid fa-x"></i>
                    </button>
                </div>
                <p className="text-muted-text-dark dark:text-muted-text">
                    These products were already present in the data base
                </p>
                <hr className="text-muted-text-dark dark:text-muted-text mt-6 mb-4" />
                <ul className="flex flex-col gap-2 list-disc pl-5">
                    {existingProducts.map((item, index) => (
                        <li key={index}>
                            <span className="truncate block">{item}</span>
                        </li>
                    ))}
                </ul>
                <hr className="text-muted-text-dark dark:text-muted-text mt-4 mb-4" />
            </div>
        </div>
    );
};

export default ImportConflictsModal;
