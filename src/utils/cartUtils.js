export const getTotalItems = (cartItems) => Object.values(cartItems).reduce((sum, item) => sum + item.quantity, 0);

export const getTotalPrice = (cartItems) =>
    Object.values(cartItems).reduce((sum, item) => sum + item.price * item.quantity, 0);
