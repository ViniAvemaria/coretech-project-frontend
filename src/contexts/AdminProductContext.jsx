import { createContext, useContext } from "react";
import { useProductFilters } from "../hooks/useProductFilters";

const AdminProductContext = createContext(null);

export const AdminProductProvider = ({ children }) => {
    const filters = useProductFilters(20);

    return <AdminProductContext.Provider value={filters}>{children}</AdminProductContext.Provider>;
};

export const useAdminProducts = () => useContext(AdminProductContext);
