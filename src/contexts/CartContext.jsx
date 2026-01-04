import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import {
    getCart,
    addItem as addItemApi,
    incrementItem as incrementItemApi,
    decrementItem as decrementItemApi,
    deleteFromCart as deleteFromCartApi,
} from "../api/cartService";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCart = async () => {
        if (!isAuthenticated) {
            setCart(null);
            setLoading(false);
            return;
        }

        try {
            const { data } = await getCart();
            setCart(data.data);
        } catch {
            setCart(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    const addItem = async (payload) => {
        await addItemApi(payload);
        await fetchCart();
    };

    const incrementItem = async (id) => {
        await incrementItemApi(id);
        await fetchCart();
    };

    const decrementItem = async (id) => {
        await decrementItemApi(id);
        await fetchCart();
    };

    const deleteFromCart = async (id) => {
        await deleteFromCartApi(id);
        await fetchCart();
    };

    const itemCount = cart ? cart.items.reduce((sum, item) => sum + item.quantity, 0) : 0;

    const totalPrice = cart?.items?.reduce((sum, item) => sum + item.product.price * item.quantity, 0) ?? 0;

    const value = {
        cart,
        items: cart?.items ?? [],
        itemCount,
        totalPrice,
        fetchCart,
        addItem,
        incrementItem,
        decrementItem,
        deleteFromCart,
        loading,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
