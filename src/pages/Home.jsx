import ProductCard from "../components/ProductCard";
import { useProducts } from "../contexts/ProductContext";
import Loading from "../components/Loading";

const Home = () => {
    const {
        products,
        categories,
        activeCategory,
        setActiveCategory,
        productsLoading,
        totalElements,
        page,
        totalPages,
        fetchProducts,
        search,
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
            {productsLoading ? (
                <div className="flex items-center justify-center h-full">
                    <Loading />
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
                                } whitespace-nowrap`}
                                key={category.id}
                            >
                                {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                            </button>
                        ))}
                    </div>
                    <h2 className="text-muted-text-dark dark:text-muted-text text-xl mt-26 mb-6">{`${totalElements} products found`}</h2>
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
