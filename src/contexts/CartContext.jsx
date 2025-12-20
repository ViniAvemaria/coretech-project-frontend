import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const stored = localStorage.getItem("cartItems");
        return stored ? JSON.parse(stored) : {};
    });

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems((prev) => {
            const id = product.id;

            if (prev[id]) {
                return {
                    ...prev,
                    [id]: {
                        ...prev[id],
                        quantity: prev[id].quantity + 1,
                    },
                };
            }

            return {
                ...prev,
                [id]: {
                    ...product,
                    quantity: 1,
                },
            };
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prev) => {
            const { [id]: _, ...rest } = prev;
            return rest;
        });
    };

    const decrementItem = (id) => {
        setCartItems((prev) => {
            const item = prev[id];
            if (!item) return prev;

            if (item.quantity === 1) {
                const { [id]: _, ...rest } = prev;
                return rest;
            }

            return {
                ...prev,
                [id]: {
                    ...item,
                    quantity: item.quantity - 1,
                },
            };
        });
    };

    const clearCart = () => {
        setCartItems({});
    };

    const value = {
        cartItems,
        cartArray: Object.values(cartItems),
        addToCart,
        removeFromCart,
        decrementItem,
        clearCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
