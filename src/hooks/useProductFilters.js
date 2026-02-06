import { useEffect, useRef, useState } from "react";
import { getAll as getAllCategories } from "../api/categoryService";
import { getAll as getAllProducts, getAdvancedSort } from "../api/productService";

export const useProductFilters = (pageSize) => {
    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [size] = useState(pageSize);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [sort, setSort] = useState({ field: "createdAt", dir: "desc" });
    const firstRun = useRef(true);

    const fetchProducts = async (cat, q, pg = page, sor = sort) => {
        setProductsLoading(true);
        try {
            const isAdvanced = ["reviews", "rating"].includes(sor.field);

            const sortParam = isAdvanced ? `${sor.field}-${sor.dir}` : `${sor.field},${sor.dir}`;

            const res = isAdvanced
                ? await getAdvancedSort(cat, q, pg, size, sortParam)
                : await getAllProducts(cat, q, pg, size, sortParam);

            setProducts(res.data.data.content);
            setTotalPages(res.data.data.totalPages);
            setTotalElements(res.data.data.totalElements);
            setPage(pg);
        } finally {
            setProductsLoading(false);
        }
    };

    const fetchCategories = async () => {
        setCategoriesLoading(true);
        try {
            const res = await getAllCategories();
            setCategories(res.data.data);
        } finally {
            setCategoriesLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(activeCategory, search, 0, sort);
    }, [activeCategory, sort]);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (firstRun.current) {
            firstRun.current = false;
            return;
        }

        const t = setTimeout(() => {
            fetchProducts(activeCategory, search, 0, sort);
        }, 650);

        return () => clearTimeout(t);
    }, [search]);

    return {
        products,
        productsLoading,
        categories,
        activeCategory,
        search,
        page,
        totalPages,
        totalElements,
        sort,
        categoriesLoading,
        setSearch,
        setActiveCategory,
        setSort,
        fetchProducts,
        fetchCategories,
    };
};
