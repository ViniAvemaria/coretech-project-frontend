import { useCart } from "../contexts/CartContext";
import { formatMoney } from "../utils/formatMoney";
import ItemCard from "../components/ItemCard";

const Cart = () => {
    const { items, itemCount, totalPrice } = useCart();
    const subTotal = totalPrice;
    const tax = subTotal * 0.1;
    const cartTotal = subTotal + tax;

    return (
        <div className="max-w-[1200px] w-full py-12">
            <h2 className="section-title">Shopping Cart</h2>

            <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-8 ">
                <div className="min-[1000px]:col-span-2 flex flex-col gap-6">
                    {items.map((item) => (
                        <ItemCard key={item.id} item={item} />
                    ))}
                </div>
                <div className="flex flex-col gap-3 sticky top-10 h-fit p-5 bg-card dark:bg-card-dark border border-border dark:border-border-dark rounded-lg text-primary-text dark:text-primary-text-dark shadow-sm">
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
                    <button className="mt-2 bg-brand text-white rounded-lg py-3 hover:cursor-pointer hover:bg-brand-hover transition-color duration-300 ease">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
