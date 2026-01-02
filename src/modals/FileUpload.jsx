import { useState } from "react";
import { createFromImport } from "../api/productService";
import { toast } from "react-toastify";
import { getAll } from "../api/productService";

const FileUpload = ({ setIsOpen, setProducts }) => {
    const [existingProducts, setExistingProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const res = await getAll();
            setProducts(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    const close = () => {
        setIsOpen(false);
        fetchProducts();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = sessionStorage.getItem("accessToken");
            const formData = new FormData();
            formData.append("file", e.target.file.files[0]);
            const response = await createFromImport(token, formData);
            toast.success(response.data?.message || "Products imported successfully");
            if (!response.data.data) {
                close();
            } else {
                setExistingProducts(response.data.data);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to import products");
        }
    };

    return (
        <div className="flex items-center justify-center fixed inset-0 bg-black/75">
            {existingProducts?.length > 0 ? (
                <div className="flex flex-col max-w-150 text-primary-text dark:text-primary-text-dark px-6 py-8 bg-header dark:bg-header-dark border border-border dark:border-border-dark rounded-xl max-h-[80vh] overflow-y-auto">
                    <h2 className="section-title mb-2">{`Existing products (${existingProducts.length})`}</h2>
                    <p className="text-muted-text-dark dark:text-muted-text">
                        These products were already present in the data base
                    </p>
                    <hr className="text-muted-text-dark dark:text-muted-text mt-4 mb-4" />
                    <ul className="flex flex-col gap-2 list-disc pl-5">
                        {existingProducts.map((item, index) => (
                            <li key={index}>
                                <span className="truncate block">{item}</span>
                            </li>
                        ))}
                    </ul>
                    <hr className="text-muted-text-dark dark:text-muted-text mt-4 mb-4" />
                    <button
                        onClick={() => close()}
                        className="place-self-center py-1.5 px-4.5 bg-red-600 hover:bg-red-700 text-white transition-colors duration-300 ease cursor-pointer rounded-lg"
                    >
                        Close
                    </button>
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col px-6 py-8 bg-header dark:bg-header-dark border border-border dark:border-border-dark rounded-xl text-primary-text dark:text-primary-text-dark"
                >
                    <h2 className="section-title mb-2">Import Products</h2>
                    <p className="text-muted-text-dark dark:text-muted-text">
                        Upload a CSV file to easily import multiple products
                    </p>
                    <hr className="text-muted-text-dark dark:text-muted-text mt-4 mb-8" />
                    <input
                        className="flex items-center text-sm text-muted-text-dark dark:text-muted-text file:mr-3 file:py-1 file:px-2 file:border-b file:border-brand file:bg-transparent hover:file:text-brand-hover"
                        type="file"
                        name="file"
                        accept=".xlsx,.csv"
                        required
                    />
                    <div className="flex w-full justify-around mt-10">
                        <button
                            className="text-white bg-brand hover:bg-brand-hover py-1.5 px-4 rounded-lg transition-colors duration-300 ease cursor-pointer"
                            type="submit"
                        >
                            Import
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white bg-red-600 hover:bg-red-700 py-1.5 px-4 rounded-lg transition-colors duration-300 ease cursor-pointer"
                            type="button"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default FileUpload;
