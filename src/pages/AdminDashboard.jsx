import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import ImportConflictsModal from "../modals/ImportConflictsModal";
import { createFromImport, deleteProduct } from "../api/productService";
import { formatMoney } from "../utils/formatMoney";
import { toast } from "react-toastify";
import ProductModal from "../modals/ProductModal";
import { useProducts } from "../contexts/ProductContext";
import Loading from "../components/Loading";

const AdminDashborad = () => {
    const { products, fetchProducts, fetchCategories, loading } = useProducts();
    const [existingProducts, setExistingProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState("products");
    const [productModalObj, setProductModalObj] = useState({
        action: null,
        product: null,
    });
    const location = useLocation();
    const formRef = useRef(null);
    const fileInputRef = useRef(null);

    const handleFileChange = () => {
        formRef.current.requestSubmit();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("file", fileInputRef.current.files[0]);
            const response = await createFromImport(formData);
            toast.success(response.data?.message || "Products imported successfully");
            fetchProducts();
            fetchCategories();
            if (response.data.data) setExistingProducts(response.data.data);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to import products");
        } finally {
            fileInputRef.current.value = "";
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            toast.success("Product deleted successfully");
            fetchProducts();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete product");
        }
    };

    return (
        <div className="max-w-[1200px] w-full py-12">
            <h2 className="text-lg font-bold text-primary-text dark:text-primary-text-dark mb-6">Admin Dashboard</h2>

            <div className="flex gap-12 text-muted-text-dark dark:text-muted-text">
                <button
                    onClick={() => setActiveTab("products")}
                    className={`flex items-center cursor-pointer pb-2 transition-colors ${
                        activeTab === "products"
                            ? "text-brand border-b-2 border-blue-500"
                            : "hover:text-gray-400 dark:hover:text-gray-500"
                    }`}
                >
                    <i className="fa-solid fa-bag-shopping mr-2"></i>
                    <p>{`Products (${products.length})`}</p>
                </button>

                <button
                    onClick={() => setActiveTab("orders")}
                    className={`flex items-center cursor-pointer pb-2 transition-colors ${
                        activeTab === "orders"
                            ? "text-brand border-b-2 border-blue-500"
                            : "hover:text-gray-400 dark:hover:text-gray-500"
                    }`}
                >
                    <i className="fa-solid fa-box mr-2"></i>
                    <p>{`Orders (${orders.length})`}</p>
                </button>
            </div>

            {activeTab === "orders" && (
                <div className="text-primary-text dark:text-primary-text-dark mt-6 mb-6">
                    <h2>Orders Management</h2>
                    <div className="flex flex-col items-center gap-5 w-full px-10 py-12 rounded-xl border border-border dark:border-border-dark bg-header dark:bg-header-dark text-primary-text dark:text-primary-text-dark mt-8">
                        <i className="fa-solid fa-box text-5xl text-muted-text-dark dark:text-muted-text"></i>
                        <p className="text-primary-text dark:text-primary-text-dark">No orders yet</p>
                    </div>
                </div>
            )}

            {activeTab === "products" &&
                (loading ? (
                    <div className="flex items-center justify-center h-full w-full">
                        <Loading />
                    </div>
                ) : (
                    <>
                        <div className="flex items-center justify-between text-primary-text dark:text-primary-text-dark mt-6 mb-6">
                            <h2>Product Management</h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => fileInputRef.current.click()}
                                    className="edit-button py-2 px-3.5 rounded-xl"
                                >
                                    <i className="fa-solid fa-file-import mr-2"></i>
                                    Import CSV
                                </button>

                                <form ref={formRef} onSubmit={handleSubmit}>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </form>

                                <button
                                    onClick={() =>
                                        setProductModalObj({
                                            action: "add",
                                            product: null,
                                        })
                                    }
                                    className="text-white bg-brand py-2 px-3.5 rounded-xl cursor-pointer hover:bg-brand-hover transition-colors duration-300 ease"
                                >
                                    <i className="fa-solid fa-plus text-sm mr-2"></i>
                                    Add Product
                                </button>
                            </div>
                        </div>

                        <div className="rounded-xl overflow-hidden text-primary-text dark:text-primary-text-dark text-left border border-border dark:border-border-dark bg-header dark:bg-header-dark">
                            <table className="min-w-full table-fixed ">
                                <thead className="bg-card dark:bg-card-dark">
                                    <tr>
                                        <th className="w-2/5 px-5 py-4">Product</th>
                                        <th className="px-5 py-4">Category</th>
                                        <th className="px-5 py-4">Price</th>
                                        <th className="px-5 py-4">Stock</th>
                                        <th className="px-5 py-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product.id} className="border border-border dark:border-border-dark">
                                            <td className="w-2/5 px-5 py-3 max-w-xs">
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-16 h-16 object-cover rounded-xl shrink-0"
                                                    />
                                                    <span className="truncate hover:cursor-pointer hover:text-brand transition-color duration-300 ease">
                                                        <Link
                                                            to={`/product/${product.id}`}
                                                            state={{ from: location.pathname }}
                                                        >
                                                            {product.name}
                                                        </Link>
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3 capitalize">{product.category}</td>
                                            <td className="px-5 py-3">{formatMoney(product.price)}</td>
                                            <td className="px-5 py-3">{product.stockQuantity}</td>
                                            <td className="px-5 py-3">
                                                <button
                                                    onClick={() =>
                                                        setProductModalObj({
                                                            action: "edit",
                                                            product: product,
                                                        })
                                                    }
                                                    className="px-2 py-1 text-blue-600 hover:text-blue-500 cursor-pointer transition-colors duration-300 ease"
                                                >
                                                    <i className="fa-solid fa-pen"></i>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="px-2 py-1 text-red-600 hover:text-red-500 cursor-pointer transition-colors duration-300 ease"
                                                >
                                                    <i className="fa-solid fa-trash-can"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                ))}
            {existingProducts.length > 0 && (
                <ImportConflictsModal existingProducts={existingProducts} setExistingProducts={setExistingProducts} />
            )}

            {productModalObj.action && (
                <ProductModal productModalObj={productModalObj} setProductModalObj={setProductModalObj} />
            )}
        </div>
    );
};

export default AdminDashborad;
