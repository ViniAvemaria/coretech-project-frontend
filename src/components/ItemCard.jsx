import { useCart } from "../contexts/CartContext";
import { formatMoney } from "../utils/formatMoney";
import { Link } from "react-router-dom";

const ItemCard = ({ item }) => {
    const { id, product, quantity } = item;
    const { incrementItem, decrementItem, deleteFromCart } = useCart();
    const itemTotal = quantity * product.price;

    return (
        <div className="flex gap-8 max-xs:gap-2 h-50 text-primary-text dark:text-primary-text-dark bg-header dark:bg-header-dark p-5 rounded-lg border border-border dark:border-border-dark shadow-sm">
            <div>
                <img src={product.image} alt={product.name} className="w-40 h-full object-cover rounded-lg" />
            </div>
            <div className="flex flex-col w-full gap-1.5">
                <p className="line-clamp-2 min-h-10 leading-snug hover:cursor-pointer hover:text-brand transition-color duration-300 ease max-xs:text-end">
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                </p>
                <p className="max-xs:hidden line-clamp-2 min-h-10 leading-snug text-muted-text-dark dark:text-muted-text text-sm">
                    {product.description}
                </p>
                <p className="text-brand max-xs:place-self-end-safe">{formatMoney(product.price)}</p>
                <div className="flex max-xs:flex-col max-xs:gap-4 mt-auto justify-between text-primary-text dark:text-primary-text-dark max-xs:place-self-end-safe">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => decrementItem(id)}
                            className="flex items-center hover:cursor-pointer border border-border dark:border-border-dark px-2 pt-1.75 pb-1.25 rounded-sm hover:bg-gray-300 hover:dark:bg-gray-600 transition-colors duration-300 ease"
                        >
                            <i className="fa-solid fa-minus text-sm"></i>
                        </button>
                        <p>{quantity}</p>
                        <button
                            onClick={() => incrementItem(id)}
                            className="flex items-center hover:cursor-pointer border border-border dark:border-border-dark px-2 pt-1.75 pb-1.25 rounded-sm hover:bg-gray-300 hover:dark:bg-gray-600 transition-colors duration-300 ease"
                        >
                            <i className="fa-solid fa-plus text-sm"></i>
                        </button>
                    </div>
                    <div className="flex justify-end-safe items-center gap-4">
                        <p>{formatMoney(itemTotal)}</p>
                        <button onClick={() => deleteFromCart(id)} className="hover:cursor-pointer">
                            <i className="fa-solid fa-trash-can text-red-500"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;
