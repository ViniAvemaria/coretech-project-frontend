import { useRef } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { getAll as getAllProducts } from "../api/productService";
import { getAll as getAllCategories } from "../api/categoryService";

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [search, setSearch] = useState("");
    const firstRun = useRef(true);

    const fetchProducts = async (cat = categories, query = search) => {
        setLoading(true);
        try {
            const res = await getAllProducts(cat, query);
            setProducts(res.data.data);
        } catch (err) {
            console.error(err);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await getAllCategories();
            setCategories(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(activeCategory, search);
    }, [activeCategory]);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (firstRun.current) {
            firstRun.current = false;
            return;
        }

        const timer = setTimeout(() => {
            fetchProducts(activeCategory, search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    return (
        <ProductContext.Provider
            value={{
                products,
                loading,
                categories,
                search,
                activeCategory,
                setCategories,
                setSearch,
                setActiveCategory,
                fetchProducts,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => useContext(ProductContext);
