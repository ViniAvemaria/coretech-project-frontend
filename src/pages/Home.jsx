import ProductCard from "../components/ProductCard";
import { useProducts } from "../contexts/ProductContext";
import Loading from "../components/Loading";

const Home = () => {
    const { products, categories, activeCategory, setActiveCategory, loading } = useProducts();

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="max-w-[1200px] w-full pb-12">
                    <div className="flex items-center gap-2 px-10 absolute bg-header dark:bg-header-dark border-b border-border dark:border-border-dark h-18 w-full left-0">
                        <button
                            onClick={() => setActiveCategory(null)}
                            className={`category-button ${
                                activeCategory === null ? "category-button" : "category-button-off"
                            }`}
                        >
                            All Products
                        </button>
                        {categories.map((category) => (
                            <button
                                onClick={() => setActiveCategory(category.name)}
                                className={`category-button ${
                                    activeCategory === category.name ? "category-button" : "category-button-off"
                                }`}
                                key={category.id}
                            >
                                {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                            </button>
                        ))}
                    </div>

                    <h2 className="text-muted-text-dark dark:text-muted-text text-xl mt-26 mb-6">{`${products.length} products found`}</h2>

                    <div className="grid grid-cols-[repeat(auto-fit,minmax(275px,1fr))] place-items-center gap-8">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Home;
