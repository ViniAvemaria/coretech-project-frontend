import { useState, useEffect } from "react";
import { create, update } from "../api/productService";
import { toast } from "react-toastify";
import { useAdminProducts } from "../contexts/AdminProductContext";
import { Plus, X } from "lucide-react";

const ProductModal = ({ productModalObj, setProductModalObj }) => {
    const [loading, setLoading] = useState(false);
    const { action, product } = productModalObj;
    const { categories, fetchProducts, fetchCategories } = useAdminProducts();
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
        stockQuantity: "",
        specifications: [""],
        photoCredit: { authorName: "", url: "", source: "" },
        category: "",
    });

    useEffect(() => {
        if (action === "edit" && product) {
            setForm({
                name: product.name ?? "",
                description: product.description ?? "",
                price: String(product.price ?? ""),
                image: product.image ?? "",
                stockQuantity: String(product.stockQuantity ?? ""),
                specifications: product.specifications?.length ? product.specifications : [""],
                photoCredit: {
                    authorName: product.photoCredit?.authorName ?? "",
                    url: product.photoCredit?.url ?? "",
                    source: product.photoCredit?.source ?? "",
                },
                category: product.category ?? "",
            });
        }
    }, [action, product]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("photoCredit.")) {
            setForm((prev) => ({
                ...prev,
                photoCredit: { ...prev.photoCredit, [name.split(".")[1]]: value },
            }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSpecChange = (index, value) => {
        const newSpecs = [...form.specifications];
        newSpecs[index] = value;
        setForm((prev) => ({ ...prev, specifications: newSpecs }));
    };

    const addSpecification = () => setForm((prev) => ({ ...prev, specifications: [...prev.specifications, ""] }));

    const removeSpecification = (index) => {
        const newSpecs = [...form.specifications];
        newSpecs.splice(index, 1);
        setForm((prev) => ({ ...prev, specifications: newSpecs }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (action == "add") {
            try {
                const payload = {
                    ...form,
                    price: Number(form.price),
                    stockQuantity: Number(form.stockQuantity),
                };
                await create(payload);
                toast.success("Product added successfully");
                setForm({
                    name: "",
                    description: "",
                    price: "",
                    image: "",
                    stockQuantity: "",
                    specifications: [""],
                    photoCredit: { authorName: "", url: "", source: "" },
                    category: "",
                });
            } catch (err) {
                toast.error(err.response?.data?.message || "Failed to add product");
            } finally {
                setLoading(false);
            }
        } else {
            try {
                const payload = {
                    ...form,
                    price: Number(form.price),
                    stockQuantity: Number(form.stockQuantity),
                };
                await update(product.id, payload);
                toast.success("Product updated successfully");
                setProductModalObj({
                    action: null,
                    product: null,
                });
            } catch (err) {
                toast.error(err.response?.data?.message || "Failed to update product");
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
        fetchCategories();
    };

    return (
        <div className="flex items-center justify-center fixed inset-0 bg-black/35 backdrop-blur-sm px-8">
            <div className="flex flex-col max-w-150 text-primary-text dark:text-primary-text-dark p-8 bg-header dark:bg-header-dark border border-border dark:border-border-dark rounded-lg max-h-[80vh] overflow-y-auto">
                <h2 className="section-title mb-6">{action == "add" ? "Add New Product" : "Edit Product"}</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-2 gap-4 max-[550px]:grid-cols-1">
                        <div className="col-span-2 max-[550px]:col-span-1">
                            <label htmlFor="name" className="font-semibold text-muted-text-dark dark:text-muted-text">
                                Name
                            </label>
                            <input
                                id="name"
                                className="input input-autofill mt-2"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="image" className="font-semibold text-muted-text-dark dark:text-muted-text">
                                Image URL
                            </label>
                            <input
                                id="image"
                                className="input input-autofill mt-2"
                                name="image"
                                value={form.image}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="price" className="font-semibold text-muted-text-dark dark:text-muted-text">
                                Price
                            </label>
                            <input
                                id="price"
                                className="input input-autofill mt-2"
                                type="number"
                                step="0.01"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="stock" className="font-semibold text-muted-text-dark dark:text-muted-text">
                                Stock Quantity
                            </label>
                            <input
                                id="stock"
                                className="input input-autofill mt-2"
                                type="number"
                                name="stockQuantity"
                                value={form.stockQuantity}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="category"
                                className="font-semibold text-muted-text-dark dark:text-muted-text"
                            >
                                Category
                            </label>
                            <input
                                id="category"
                                className="input input-autofill mt-2"
                                name="category"
                                list="categories"
                                autoComplete="off"
                                value={form.category}
                                onFocus={() => setForm((f) => ({ ...f, category: "" }))}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="description"
                            className="font-semibold text-muted-text-dark dark:text-muted-text"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            className="input h-28 resize-none input-autofill mt-2"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <datalist id="categories">
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.name} />
                        ))}
                    </datalist>

                    <div className="flex flex-col gap-3">
                        <span className="font-semibold text-muted-text-dark dark:text-muted-text">Specifications</span>
                        {form.specifications.map((spec, i) => (
                            <div key={i} className="flex gap-2">
                                <input
                                    className="input flex-1 input-autofill"
                                    value={spec}
                                    onChange={(e) => handleSpecChange(i, e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => removeSpecification(i)}
                                    className="text-red-500 hover:text-red-600 cursor-pointer"
                                >
                                    <X />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addSpecification}
                            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 self-start cursor-pointer"
                        >
                            <Plus size={18} />
                            Add specification
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 max-[550px]:grid-cols-1">
                        <div>
                            <label htmlFor="author" className="font-semibold text-muted-text-dark dark:text-muted-text">
                                Author
                            </label>
                            <input
                                id="author"
                                className="input input-autofill mt-2"
                                name="photoCredit.authorName"
                                value={form.photoCredit.authorName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="photo" className="font-semibold text-muted-text-dark dark:text-muted-text">
                                Profile URL
                            </label>
                            <input
                                id="photo"
                                className="input input-autofill mt-2"
                                name="photoCredit.url"
                                value={form.photoCredit.url}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="source" className="font-semibold text-muted-text-dark dark:text-muted-text">
                                Source
                            </label>
                            <input
                                id="source"
                                className="input input-autofill mt-2"
                                name="photoCredit.source"
                                value={form.photoCredit.source}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`flex-1 relative overflow-hidden py-2 rounded-lg text-white transition-colors duration-300 ease cursor-pointer ${loading ? "bg-brand/95 cursor-not-allowed" : "bg-brand hover:bg-brand-hover"}`}
                        >
                            {loading && (
                                <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/35 to-transparent" />
                            )}
                            <span className="relative z-10">
                                {loading
                                    ? `${productModalObj.action === "add" ? "Adding..." : "Updating..."}`
                                    : `${productModalObj.action === "add" ? "Add" : "Update"}`}
                            </span>
                        </button>

                        <button
                            disabled={loading}
                            type="button"
                            onClick={() =>
                                setProductModalObj({
                                    action: null,
                                    product: null,
                                })
                            }
                            className={`flex-1 bg-red-600  text-white py-2 rounded-lg transition-colors duration-300 ease ${loading ? "cursor-not-allowed bg-red-600/50" : "cursor-pointer hover:bg-red-700"}`}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;
