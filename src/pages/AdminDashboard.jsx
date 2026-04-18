import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import ImportConflictsModal from "../modals/ImportConflictsModal";
import { createFromImport, deleteProduct } from "../api/productService";
import { formatMoney } from "../utils/formatMoney";
import { toast } from "react-toastify";
import ProductModal from "../modals/ProductModal";
import { useAdminProducts } from "../contexts/AdminProductContext";
import Loading from "../components/Loading";
import ProductCardDashboard from "../components/ProductCardDashboard";
import AdminOrders from "../components/AdminOrders";
import {
    Plus,
    Pencil,
    Trash2,
    Search as Magnifying,
    FileUp,
    ShoppingBag,
    Package,
    X,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

const AdminDashborad = () => {
    const {
        products,
        fetchProducts,
        fetchCategories,
        productsLoading,
        categoriesLoading,
        page,
        totalPages,
        activeCategory,
        search,
        totalElements,
        setSort,
        sort,
        categories,
        setSearch,
        setActiveCategory,
    } = useAdminProducts();
    const [importLoading, setImportLoading] = useState(false);
    const [existingProducts, setExistingProducts] = useState([]);
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
        setImportLoading(true);
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
            setImportLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            fetchProducts();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete product");
        }
    };

    const handleNextPage = async () => {
        fetchProducts(activeCategory, search, page + 1, undefined);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handlePreviousPage = async () => {
        fetchProducts(activeCategory, search, page - 1, undefined);
        window.scrollTo({ top: 0, behavior: "smooth" });
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
                    <ShoppingBag size={18} className="mr-2" />
                    <p>Products</p>
                </button>

                <button
                    onClick={() => setActiveTab("orders")}
                    className={`flex items-center cursor-pointer pb-2 transition-colors ${
                        activeTab === "orders"
                            ? "text-brand border-b-2 border-blue-500"
                            : "hover:text-gray-400 dark:hover:text-gray-500"
                    }`}
                >
                    <Package size={18} className="mr-2" />
                    <p>Orders</p>
                </button>
            </div>

            {activeTab === "orders" && <AdminOrders />}

            {activeTab === "products" && (
                <>
                    <div className="flex items-center justify-between text-primary-text dark:text-primary-text-dark mt-6 mb-6 max-[550px]:flex-col max-[550px]:items-start max-[550px]:gap-4">
                        <h2>Product Management</h2>
                        <div className="flex gap-2">
                            <button
                                disabled={importLoading}
                                onClick={() => fileInputRef.current.click()}
                                className={`flex items-center edit-button py-1.5 px-3 rounded-lg ${importLoading && `hover:bg-edit-button dark:hover:bg-edit-button-dark cursor-not-allowed opacity-90`}`}
                            >
                                <FileUp size={18} className="mr-2" />
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
                                disabled={importLoading}
                                onClick={() =>
                                    setProductModalObj({
                                        action: "add",
                                        product: null,
                                    })
                                }
                                className={`flex items-center text-white bg-brand py-1.5 px-3 rounded-lg transition-colors duration-300 ease ${importLoading ? `hover:bg-brand cursor-not-allowed opacity-90` : `cursor-pointer hover:bg-brand-hover`}`}
                            >
                                <Plus size={18} className="mr-2" />
                                Add Product
                            </button>
                        </div>
                    </div>

                    {productsLoading || importLoading || categoriesLoading ? (
                        <div className="flex items-center justify-center mt-30 w-full">
                            <Loading />
                        </div>
                    ) : (
                        <>
                            <section className="flex flex-col gap-4 text-primary-text dark:text-primary-text-dark bg-header dark:bg-header-dark border border-border dark:border-border-dark rounded-lg mb-4 py-5 px-4 w-full">
                                <div className="flex gap-4 max-[835px]:flex-col">
                                    <div className="group flex flex-1 items-center w-full border bg-input dark:bg-input-dark border-border px-4 py-2 rounded-lg gap-2 dark:border-border-dark focus-within:border-focus-ring transition-colors duration-300 ease">
                                        <Magnifying
                                            size={18}
                                            className="text-muted-text dark:text-muted-text-dark group-focus-within:text-focus-ring transition-colors duration-300 ease"
                                        />
                                        <input
                                            id="search-bar"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            type="text"
                                            autoComplete="off"
                                            placeholder="Search for products..."
                                            className="w-full focus:outline-none text-primary-text dark:text-primary-text-dark"
                                        />
                                        <button
                                            onMouseDown={(e) => e.preventDefault()}
                                            onClick={() => {
                                                setSearch("");
                                            }}
                                            className="text-muted-text dark:text-muted-text-dark group-focus-within:text-focus-ring transition-colors duration-300 ease text-sm cursor-pointer"
                                        >
                                            {search && <X size={18} />}
                                        </button>
                                    </div>

                                    <select
                                        className="flex-1 px-4 py-2 text-primary-text dark:text-primary-text-dark bg-input dark:bg-input-dark border border-border dark:border-border-dark rounded-lg w-full focus-within:border-focus-ring transition-colors duration-300 ease cursor-pointer capitalize"
                                        onChange={(e) => setActiveCategory(e.target.value)}
                                    >
                                        <option value="">All Categories</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.name}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>

                                    <select
                                        className="flex-1 px-4 py-2 text-primary-text dark:text-primary-text-dark bg-input dark:bg-input-dark border border-border dark:border-border-dark rounded-lg w-full focus-within:border-focus-ring transition-colors duration-300 ease cursor-pointer"
                                        value={`${sort.field}-${sort.dir}`}
                                        onChange={(e) => {
                                            const [field, dir] = e.target.value.split("-");
                                            setSort({ field, dir });
                                        }}
                                    >
                                        <option value="createdAt-desc">Newest</option>
                                        <option value="createdAt-asc">Oldest</option>
                                        <option value="price-desc">Price&nbsp;&nbsp;↑</option>
                                        <option value="price-asc">Price&nbsp;&nbsp;↓</option>
                                        <option value="rating-desc">Rating&nbsp;&nbsp;↑</option>
                                        <option value="rating-asc">Rating&nbsp;&nbsp;↓</option>
                                        <option value="reviews-desc">Reviews&nbsp;&nbsp;↑</option>
                                        <option value="reviews-asc">Reviews&nbsp;&nbsp;↓</option>
                                    </select>
                                </div>
                                <p className="text-sm text-muted-text-dark dark:text-muted-text">{`Showing ${products.length} of ${totalElements} products`}</p>
                            </section>

                            <div className="flex flex-col min-[835px]:hidden text-primary-text dark:text-primary-text-dark ring-1 ring-border dark:ring-border-dark rounded-lg overflow-hidden">
                                {products.map((product) => (
                                    <ProductCardDashboard
                                        key={product.id}
                                        product={product}
                                        setProductModalObj={setProductModalObj}
                                        handleDelete={handleDelete}
                                    />
                                ))}
                            </div>

                            <div className="max-[835px]:hidden rounded-lg overflow-hidden text-primary-text dark:text-primary-text-dark text-left border border-border dark:border-border-dark bg-header dark:bg-header-dark">
                                <table className="min-w-full table-fixed">
                                    <thead className="bg-card dark:bg-card-dark">
                                        <tr>
                                            <th className="px-5 py-4">Product</th>
                                            <th className="px-5 py-4">Category</th>
                                            <th className="px-5 py-4">Price</th>
                                            <th className="px-5 py-4">Stock</th>
                                            <th className="px-5 py-4">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product) => (
                                            <tr
                                                key={product.id}
                                                className="border border-border dark:border-border-dark"
                                            >
                                                <td className="px-5 py-3 max-w-xs">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="w-16 h-16 object-cover rounded-lg shrink-0"
                                                        />
                                                        <div className="truncate">
                                                            <span className=" hover:cursor-pointer hover:text-brand transition-color duration-300 ease">
                                                                <Link
                                                                    to={`/product/${product.id}`}
                                                                    state={{ from: location.pathname }}
                                                                >
                                                                    {product.name}
                                                                </Link>
                                                            </span>
                                                            <p className="flex items-center gap-1 text-sm text-muted-text-dark dark:text-muted-text">
                                                                <i className="fa-solid fa-star text-xs text-yellow-400"></i>
                                                                {`${product.rating} (${product.totalReviews})`}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3 capitalize">{product.category}</td>
                                                <td className="px-5 py-3">{formatMoney(product.price)}</td>
                                                <td className="px-5 py-3">
                                                    {product.stockQuantity != 0 ? (
                                                        <p className="py-1 px-2 rounded-lg text-green-500 bg-green-500/10 text-sm w-fit">
                                                            In Stock
                                                        </p>
                                                    ) : (
                                                        <p className="text-center py-1 px-2 rounded-lg text-red-500 bg-red-500/10 text-sm w-fit">
                                                            Out of Stock
                                                        </p>
                                                    )}
                                                </td>
                                                <td className="px-5 py-3">
                                                    <button
                                                        onClick={() =>
                                                            setProductModalObj({
                                                                action: "edit",
                                                                product: product,
                                                            })
                                                        }
                                                        className="px-2 py-1 text-blue-600 hover:text-blue-500 cursor-pointer transition-colors duration-300 ease mr-2"
                                                    >
                                                        <Pencil size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product.id)}
                                                        className="px-2 py-1 text-red-600 hover:text-red-500 cursor-pointer transition-colors duration-300 ease"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex justify-center items-center gap-2 text-primary-text dark:text-primary-text-dark mt-12">
                                <div>
                                    <button disabled={page === 0} onClick={handlePreviousPage} className="page-button">
                                        <ChevronLeft size={22} />
                                    </button>
                                </div>

                                <div className="flex py-1.5 px-3.25 border border-border dark:border-border-dark rounded-lg">
                                    <p className="text-center w-2.5 font-semibold">{page + 1}</p>
                                </div>

                                <div>
                                    <button
                                        disabled={page === totalPages - 1}
                                        onClick={handleNextPage}
                                        className="page-button"
                                    >
                                        <ChevronRight size={22} />
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
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
