import ProductCard from "../components/ProductCard";
import { useProducts } from "../contexts/ProductContext";
import HomeLoading from "../components/skeleton/HomeLoading";

const Home = () => {
    const {
        products,
        categories,
        activeCategory,
        setActiveCategory,
        productsLoading,
        categoriesLoading,
        page,
        totalPages,
        fetchProducts,
        search,
        sort,
        setSort,
    } = useProducts();

    const handleNextPage = async () => {
        fetchProducts(activeCategory, search, page + 1, undefined);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handlePreviousPage = async () => {
        fetchProducts(activeCategory, search, page - 1, undefined);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="max-w-[1200px] w-full pb-12">
            {productsLoading || categoriesLoading ? (
                <div className="flex">
                    <HomeLoading />
                </div>
            ) : (
                <>
                    <div className="flex items-center w-screen min-w-[360px] gap-2 px-10 absolute bg-header dark:bg-header-dark border-b border-border dark:border-border-dark h-18 left-0 overflow-y-scroll">
                        <button
                            onClick={() => setActiveCategory(null)}
                            className={`${activeCategory === null ? "category-button" : "category-button-off"} whitespace-nowrap`}
                        >
                            All Products
                        </button>
                        {categories.map((category) => (
                            <button
                                onClick={() => setActiveCategory(category.name)}
                                className={`${
                                    activeCategory === category.name ? "category-button" : "category-button-off"
                                } whitespace-nowrap capitalize`}
                                key={category.id}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>

                    <section className="flex justify-end-safe mt-26 mb-6">
                        <select
                            className="w-fit px-4 py-2 text-primary-text dark:text-primary-text-dark bg-card dark:bg-card-dark border border-border dark:border-border-dark rounded-lg focus-within:border-focus-ring transition-colors duration-300 ease cursor-pointer"
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
                    </section>

                    <div className="grid grid-cols-[repeat(auto-fit,minmax(275px,1fr))] place-items-center gap-8">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    <div className="flex justify-center items-center gap-2 text-primary-text dark:text-primary-text-dark mt-12">
                        <div>
                            <button disabled={page === 0} onClick={handlePreviousPage} className="page-button">
                                <i className="fa-solid fa-angle-left"></i>
                            </button>
                        </div>

                        <div className="flex px-2.5 py-1 border border-border dark:border-border-dark rounded-lg">
                            <p className="text-center w-2.5 font-semibold">{page + 1}</p>
                        </div>

                        <div>
                            <button disabled={page === totalPages - 1} onClick={handleNextPage} className="page-button">
                                <i className="fa-solid fa-angle-right"></i>
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;
