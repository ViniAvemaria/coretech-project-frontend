import { useCart } from "../contexts/CartContext";
import { formatMoney } from "../utils/formatMoney";
import { Link } from "react-router-dom";

const ItemCard = ({ product }) => {
    const { incrementItem, decrementItem, deleteFromCart } = useCart();
    const itemTotal = product.quantity * product.price;

    return (
        <div className="flex gap-8 text-primary-text dark:text-primary-text-dark bg-card dark:bg-card-dark p-5 rounded-xl border border-border dark:border-border-dark shadow-sm">
            <img src={product.image} alt={product.name} className="w-40 h-40 object-cover rounded-xl" />
            <div className="flex flex-col w-full gap-1.5">
                <p className="line-clamp-2 min-h-10 leading-snug hover:cursor-pointer hover:text-brand transition-color duration-300 ease">
                    <Link to={`/product/${product.id}`} state={{ product, from: location.pathname }}>
                        {product.name}
                    </Link>
                </p>
                <p className="line-clamp-2 min-h-10 leading-snug text-muted-text-dark dark:text-muted-text text-sm">
                    {product.description}
                </p>
                <p className="text-brand">{formatMoney(product.price)}</p>
                <div className="flex mt-auto justify-between text-primary-text dark:text-primary-text-dark">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => decrementItem(product.id)}
                            className="flex items-center hover:cursor-pointer border border-border dark:border-border-dark px-2 pt-1.75 pb-1.25 rounded-sm hover:bg-gray-300 hover:dark:bg-gray-600 transition-colors duration-300 ease"
                        >
                            <i className="fa-solid fa-minus text-sm"></i>
                        </button>
                        <p>{product.quantity}</p>
                        <button
                            onClick={() => incrementItem(product)}
                            className="flex items-center hover:cursor-pointer border border-border dark:border-border-dark px-2 pt-1.75 pb-1.25 rounded-sm hover:bg-gray-300 hover:dark:bg-gray-600 transition-colors duration-300 ease"
                        >
                            <i className="fa-solid fa-plus text-sm"></i>
                        </button>
                    </div>
                    <div className="flex items-center gap-4">
                        <p>{formatMoney(itemTotal)}</p>
                        <button onClick={() => deleteFromCart(product.id)} className="hover:cursor-pointer">
                            <i className="fa-solid fa-trash-can text-red-500"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;
