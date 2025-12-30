import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { getAll } from "../api/productService";

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await getAll();
                setProducts(res.data.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="max-w-[1200px] w-full">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(275px,1fr))] place-items-center gap-8">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Home;
