import { useCart } from "../contexts/CartContext";
import { formatMoney } from "../utils/formatMoney";
import ItemCard from "../components/ItemCard";
import { Link } from "react-router-dom";
import CartLoading from "../components/skeleton/CartLoading";
import { ShoppingCart } from "lucide-react";

const Cart = () => {
    const { items, totalPrice, loading, itemCount } = useCart();
    const subTotal = totalPrice;
    const tax = subTotal * 0.1;
    const cartTotal = subTotal + tax;

    return (
        <div className="max-w-[1200px] w-full py-12">
            {loading ? (
                <CartLoading />
            ) : (
                <>
                    <h2 className="section-title">Shopping Cart</h2>

                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center gap-7 h-80 text-primary-text dark:text-primary-text-dark">
                            <ShoppingCart size={85} />
                            <h2 className="text-lg">Your cart is empty</h2>
                            <Link
                                to={"/"}
                                className="text-white bg-brand hover:bg-brand-hover transition-colors duration-300 ease cursor-pointer rounded-lg px-4 py-2.5"
                            >
                                Start Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-8 ">
                            <div className="min-[1000px]:col-span-2 flex flex-col gap-6">
                                {items.map((item) => (
                                    <ItemCard key={item.id} item={item} />
                                ))}
                            </div>
                            <div className="flex flex-col gap-3 sticky top-10 h-fit p-5 bg-header dark:bg-header-dark border border-border dark:border-border-dark rounded-lg text-primary-text dark:text-primary-text-dark shadow-sm">
                                <p className="mb-4">Order Summary</p>
                                <div className="flex justify-between text-muted-text-dark dark:text-muted-text">
                                    <p>
                                        Subtotal ({itemCount} {itemCount == 1 ? "item" : "items"})
                                    </p>
                                    <p>{formatMoney(subTotal)}</p>
                                </div>
                                <div className="flex justify-between text-muted-text-dark dark:text-muted-text">
                                    <p>Tax (10%)</p>
                                    <p>{formatMoney(tax)}</p>
                                </div>
                                <hr className="text-muted-text-dark dark:text-muted-text my-2" />
                                <div className="flex justify-between">
                                    <p>Total</p>
                                    <p className="text-brand">{formatMoney(cartTotal)}</p>
                                </div>

                                <Link
                                    to={"/checkout"}
                                    className="mt-2 bg-brand text-white rounded-lg hover:cursor-pointer hover:bg-brand-hover transition-color duration-300 ease py-3 text-center"
                                >
                                    Proceed to Checkout
                                </Link>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Cart;
