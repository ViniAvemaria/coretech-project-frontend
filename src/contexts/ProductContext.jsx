import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState, useRef } from "react";
import { getAll as getAllProducts, getById } from "../api/productService";
import { getAll as getAllCategories } from "../api/categoryService";

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [search, setSearch] = useState("");
    const firstRun = useRef(true);
    const navigate = useNavigate();

    const fetchProducts = async (cat, query) => {
        setLoading(true);
        try {
            const res = await getAllProducts(cat ?? undefined, query ?? undefined);
            setProducts(res.data.data);
        } catch (err) {
            console.error(err);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchProduct = async (id) => {
        setLoading(true);
        try {
            const res = await getById(id);
            setProduct(res.data.data);
        } catch (err) {
            console.error(err);
            setProduct(null);
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
            navigate("/");
            fetchProducts(activeCategory, search);
        }, 650);

        return () => clearTimeout(timer);
    }, [search]);

    return (
        <ProductContext.Provider
            value={{
                products,
                product,
                loading,
                categories,
                search,
                activeCategory,
                setCategories,
                setSearch,
                setActiveCategory,
                fetchProducts,
                fetchProduct,
                fetchCategories,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => useContext(ProductContext);
