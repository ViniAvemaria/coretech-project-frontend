import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState, useRef } from "react";
import { getAll as getAllProducts, getById } from "../api/productService";
import { getAll as getAllCategories } from "../api/categoryService";

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [productLoading, setProductLoading] = useState(false);
    const [productsLoading, setProductsLoading] = useState(false);
    const [categoriesLoading, setCategoriesLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [size] = useState(12);
    const [totalPages, setTotalPages] = useState(0);
    const [sort, setSort] = useState("name,asc");
    const [totalElements, setTotalElements] = useState(0);
    const firstRun = useRef(true);
    const navigate = useNavigate();

    const fetchProducts = async (cat, search, pg = page, sor = sort) => {
        setProductsLoading(true);
        try {
            const res = await getAllProducts(cat, search, pg, size, sor);
            setProducts(res.data.data.content);
            setTotalPages(res.data.data.totalPages);
            setTotalElements(res.data.data.totalElements);
            setPage(pg);
        } finally {
            setProductsLoading(false);
        }
    };

    const fetchProduct = async (id) => {
        setProductLoading(true);
        setProduct(null);

        try {
            const res = await getById(id);
            setProduct(res.data.data);
        } catch (err) {
            console.error(err);
            setProduct(null);
        } finally {
            setProductLoading(false);
        }
    };

    const fetchCategories = async () => {
        setCategoriesLoading(true);
        try {
            const res = await getAllCategories();
            setCategories(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setCategoriesLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(activeCategory, search, 0, sort);
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
            if (search !== "") {
                navigate("/");
            }
            fetchProducts(activeCategory, search, 0, sort);
        }, 650);

        return () => clearTimeout(timer);
    }, [search]);

    return (
        <ProductContext.Provider
            value={{
                products,
                product,
                productLoading,
                productsLoading,
                categoriesLoading,
                categories,
                search,
                activeCategory,
                totalPages,
                totalElements,
                page,
                setSort,
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
