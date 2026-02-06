import { createContext, useContext, useState } from "react";
import { getById } from "../api/productService";
import { useProductFilters } from "../hooks/useProductFilters";

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
    const filters = useProductFilters(12);
    const [product, setProduct] = useState(null);
    const [productLoading, setProductLoading] = useState(false);

    const fetchProduct = async (id) => {
        setProductLoading(true);
        const res = await getById(id);
        setProduct(res.data.data);
        setProductLoading(false);
    };

    return (
        <ProductContext.Provider value={{ ...filters, product, productLoading, fetchProduct }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => useContext(ProductContext);
