import { useCart } from "../contexts/CartContext";
import { formatMoney } from "../utils/formatMoney";
import { Link, useLocation } from "react-router-dom";

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const location = useLocation();

    return (
        <div className="h-[545px] w-[275px] bg-card dark:bg-card-dark border rounded-2xl border-border dark:border-border-dark overflow-hidden shadow-sm">
            <div className="group h-[300px] overflow-hidden">
                <Link to={`/product/${product.id}`} state={{ from: location.pathname }}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-[300px] object-cover rounded-t-2xl hover:cursor-pointer group-hover:scale-105 transition-transform duration-300 ease-out"
                    />
                </Link>
            </div>
            <div className="flex flex-col h-[245px] py-5 px-3 gap-3 text-primary-text dark:text-primary-text-dark">
                <p className="text-muted-text-dark dark:text-muted-text text-sm">
                    <i className="fa-solid fa-star mr-2 text-yellow-400"></i>
                    {product.rating}
                </p>
                <p className="line-clamp-2 min-h-10 leading-snug hover:cursor-pointer hover:text-brand transition-color duration-300 ease">
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                </p>
                <p className="text-muted-text-dark dark:text-muted-text text-sm line-clamp-3">{product.description}</p>
                <div className="flex justify-between items-end-safe mt-auto">
                    <p className="text-brand">{formatMoney(product.price)}</p>
                    <button
                        disabled={product.stockQuantity == 0}
                        onClick={() => addToCart(product)}
                        className="add-button"
                    >
                        <i className="fa-solid fa-cart-shopping mr-2"></i>
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
