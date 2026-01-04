import { useState, useEffect } from "react";
import { getAll as getAllProducts, create, update } from "../api/productService";
import { getAll as getAllCategories } from "../api/categoryService";
import { toast } from "react-toastify";

const ProductModal = ({ productModalObj, setProductModalObj, setProducts }) => {
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        rating: "",
        image: "",
        stockQuantity: "",
        specifications: [""],
        photoCredit: { authorName: "", url: "", source: "" },
        category: "",
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getAllCategories();
                setCategories(res.data.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        console.log(productModalObj.product);

        const init = async () => {
            if (productModalObj.action === "edit" && productModalObj.product) {
                setForm({
                    name: productModalObj.product.name ?? "",
                    description: productModalObj.product.description ?? "",
                    price: String(productModalObj.product.price ?? ""),
                    rating: String(productModalObj.product.rating ?? ""),
                    image: productModalObj.product.image ?? "",
                    stockQuantity: String(productModalObj.product.stockQuantity ?? ""),
                    specifications: productModalObj.product.specifications?.length
                        ? productModalObj.product.specifications
                        : [""],
                    photoCredit: {
                        authorName: productModalObj.product.photoCredit?.authorName ?? "",
                        url: productModalObj.product.photoCredit?.url ?? "",
                        source: productModalObj.product.photoCredit?.source ?? "",
                    },
                    category: productModalObj.product.category ?? "",
                });
            }
        };
        init();
    }, [productModalObj]);

    const fetchProducts = async () => {
        try {
            const res = await getAllProducts();
            setProducts(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

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
        if (productModalObj.action == "add") {
            try {
                const payload = {
                    ...form,
                    price: Number(form.price),
                    rating: Number(form.rating),
                    stockQuantity: Number(form.stockQuantity),
                };
                await create(payload);
                toast.success("Product added successfully");
                fetchProducts();
                setForm({
                    name: "",
                    description: "",
                    price: "",
                    rating: "",
                    image: "",
                    stockQuantity: "",
                    specifications: [""],
                    photoCredit: { authorName: "", url: "", source: "" },
                    category: "",
                });
            } catch (err) {
                toast.error(err.response?.data?.message || "Failed to add product");
            }
        } else {
            try {
                const payload = {
                    ...form,
                    price: Number(form.price),
                    rating: Number(form.rating),
                    stockQuantity: Number(form.stockQuantity),
                };
                await update(productModalObj.product.id, payload);
                toast.success("Product updated successfully");
                fetchProducts();
                setProductModalObj({
                    action: null,
                    product: null,
                });
            } catch (err) {
                toast.error(err.response?.data?.message || "Failed to update product");
            }
        }
    };

    return (
        <div className="flex items-center justify-center fixed inset-0 bg-black/75">
            <div className="flex flex-col max-w-150 text-primary-text dark:text-primary-text-dark px-6 py-8 bg-header dark:bg-header-dark border border-border dark:border-border-dark rounded-xl max-h-[80vh] overflow-y-auto">
                <h2 className="section-title mb-6">
                    {productModalObj.action == "add" ? "Add New Product" : "Edit Product"}
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            className="input input-autofill"
                            name="name"
                            placeholder="Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="input input-autofill"
                            name="image"
                            placeholder="Image URL"
                            value={form.image}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="input input-autofill"
                            type="number"
                            step="0.01"
                            name="price"
                            placeholder="Price"
                            value={form.price}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="input input-autofill"
                            type="number"
                            step="0.1"
                            name="rating"
                            placeholder="Rating"
                            value={form.rating}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="input input-autofill"
                            type="number"
                            name="stockQuantity"
                            placeholder="Stock Quantity"
                            value={form.stockQuantity}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="input input-autofill"
                            name="category"
                            list="categories"
                            placeholder="Category"
                            autoComplete="off"
                            value={form.category}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <textarea
                        className="input h-28 resize-none input-autofill"
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                        required
                    />

                    <datalist id="categories">
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.name} />
                        ))}
                    </datalist>

                    <div className="flex flex-col gap-3">
                        <span className="font-semibold">Specifications</span>
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
                                    <i className="fa-solid fa-x"></i>
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addSpecification}
                            className="text-sm text-blue-600 hover:text-blue-700 self-start cursor-pointer"
                        >
                            <i className="fa-solid fa-plus text-sm mr-2"></i>
                            Add specification
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <input
                            className="input input-autofill"
                            name="photoCredit.authorName"
                            placeholder="Author"
                            value={form.photoCredit.authorName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="input input-autofill"
                            name="photoCredit.url"
                            placeholder="URL"
                            value={form.photoCredit.url}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="input input-autofill"
                            name="photoCredit.source"
                            placeholder="Source"
                            value={form.photoCredit.source}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg cursor-pointer transition-colors duration-300 ease"
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                setProductModalObj({
                                    action: null,
                                    product: null,
                                })
                            }
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg cursor-pointer transition-colors duration-300 ease"
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
