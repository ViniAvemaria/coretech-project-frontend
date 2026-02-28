import { useOrders } from "../contexts/OrderContext";
import { formatMoney } from "../utils/formatMoney";
import { useCart } from "../contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Checkout = () => {
    const navigate = useNavigate();
    const { createOrder, createLoading } = useOrders();
    const { items, itemCount, totalPrice, fetchCart } = useCart();
    const subTotal = totalPrice;
    const tax = subTotal * 0.1;
    const shipping = 10;
    const cartTotal = subTotal + tax + shipping;

    const handlePurchase = async () => {
        try {
            const payload = {
                items: items.map((item) => ({
                    productId: item.product.id,
                    quantity: item.quantity,
                })),
            };

            await createOrder(payload);
            await fetchCart();
            toast.success("Purchase Successful");
        } catch (err) {
            if (err.response) {
                toast.error(err.response.data?.message || "Purchase Failed");
            } else {
                toast.error("Network error");
            }
        } finally {
            navigate("/profile");
        }
    };

    return (
        <div className="max-w-[1200px] w-full py-12">
            <h2 className="section-title">Review your Order</h2>

            <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-8">
                <div className="min-[1000px]:col-span-2 text-primary-text dark:text-primary-text-dark">
                    <div className="flex flex-col gap-4 bg-header dark:bg-header-dark border border-border dark:border-border-dark rounded-lg p-5">
                        <h2 className="mb-2">Order Items</h2>

                        {items.map((item) => (
                            <div key={item.product.id} className="flex h-28 gap-5">
                                <img src={item.product.image} alt="" className="w-30 h-full object-cover rounded-lg" />
                                <div className="grid grid-cols-3 w-full max-[640px]:grid-cols-1">
                                    <div className="col-span-2 flex flex-col gap-2 max-[640px]:col-span-1">
                                        <p className="line-clamp-2">{item.product.name}</p>
                                        <p className="text-muted-text-dark dark:text-muted-text text-sm">
                                            Quantity: {item.quantity}
                                        </p>
                                    </div>
                                    <p className="text-brand text-end max-[640px]:text-start">
                                        {formatMoney(item.product.price)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-6 mt-6">
                        <Link to={"/cart"} className="flex-1 edit-button flex items-center justify-center">
                            Back
                        </Link>

                        <button
                            type="submit"
                            disabled={createLoading}
                            onClick={handlePurchase}
                            className={`flex-1 relative overflow-hidden px-3.5 py-2.5 rounded-lg text-white transition-colors duration-300 ease cursor-pointer ${createLoading ? "bg-brand/95 cursor-not-allowed" : "bg-brand hover:bg-brand-hover"}`}
                        >
                            {createLoading && (
                                <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/35 to-transparent" />
                            )}
                            <span className="relative z-10">{createLoading ? "Processing..." : "Purchase"}</span>
                        </button>
                    </div>
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
                    <div className="flex justify-between text-muted-text-dark dark:text-muted-text">
                        <p>Shipping</p>
                        <p>{formatMoney(shipping)}</p>
                    </div>
                    <hr className="text-muted-text-dark dark:text-muted-text my-2" />
                    <div className="flex justify-between">
                        <p>Total</p>
                        <p className="text-brand">{formatMoney(cartTotal)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
