import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import {
    getAll as getOrdersApi,
    getById as getOrderByIdApi,
    create as createOrderApi,
    cancel as cancelOrderApi,
    updateStatus as updateStatusApi,
} from "../api/orderService";

const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [orders, setOrders] = useState([]);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [createLoading, setCreateLoading] = useState(false);

    const fetchOrders = async () => {
        if (!isAuthenticated) {
            setOrders([]);
            setFetchLoading(false);
            return;
        }

        try {
            const { data } = await getOrdersApi();
            setOrders(data.data);
        } catch {
            setOrders([]);
        } finally {
            setFetchLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [isAuthenticated]);

    const getOrderById = async (id) => {
        const { data } = await getOrderByIdApi(id);
        return data.data;
    };

    const createOrder = async (payload) => {
        setCreateLoading(true);
        try {
            await createOrderApi(payload);
        } finally {
            setCreateLoading(false);
        }
        await fetchOrders();
    };

    const cancelOrder = async (id) => {
        await cancelOrderApi(id);
        await fetchOrders();
    };

    const updateStatus = async (id, status) => {
        await updateStatusApi(id, status);
        await fetchOrders();
    };

    const value = {
        orders,
        fetchOrders,
        getOrderById,
        createOrder,
        cancelOrder,
        updateStatus,
        fetchLoading,
        createLoading,
    };

    return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export const useOrders = () => useContext(OrderContext);
