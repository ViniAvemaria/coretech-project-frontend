import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { formatMoney } from "../utils/formatMoney";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
    const { isAuthenticated } = useAuth();
    const { addItem } = useCart();
    const location = useLocation();

    const handleAddItem = async () => {
        try {
            if (!isAuthenticated) {
                throw new Error("You must sign in to use the cart");
            }
            await addItem({
                id: product.id,
                quantity: 1,
            });
        } catch (err) {
            toast.error(err.message || "Failed to add item to cart");
        }
    };

    const renderStars = (rating) => {
        const full = Math.floor(rating);
        const half = rating % 1 >= 0.5;
        const empty = 5 - full - (half ? 1 : 0);

        return (
            <>
                {[...Array(full)].map((_, i) => (
                    <i key={`f-${i}`} className="fa-solid fa-star text-sm text-yellow-400"></i>
                ))}
                {half && <i className="fa-regular fa-star-half-stroke text-sm text-yellow-400"></i>}
                {[...Array(empty)].map((_, i) => (
                    <i key={`e-${i}`} className="fa-regular fa-star text-sm text-yellow-400"></i>
                ))}
            </>
        );
    };

    return (
        <div className="h-[545px] w-[275px] bg-card dark:bg-card-dark border rounded-lg border-border dark:border-border-dark overflow-hidden shadow-sm">
            <div className="group h-[300px] overflow-hidden">
                <Link to={`/product/${product.id}`}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-[300px] object-cover rounded-t-lg hover:cursor-pointer group-hover:scale-105 transition-transform duration-300 ease-out"
                    />
                </Link>
            </div>
            <div className="flex flex-col h-[245px] py-5 px-3 gap-3 text-primary-text dark:text-primary-text-dark">
                <div className="flex gap-2">
                    <p>{renderStars(product.rating)}</p>
                    <p>{product.rating}</p>
                </div>
                <p className="line-clamp-2 min-h-10 leading-snug hover:cursor-pointer hover:text-brand transition-color duration-300 ease">
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                </p>
                <p className="text-muted-text-dark dark:text-muted-text text-sm line-clamp-3">{product.description}</p>
                <div className="flex justify-between items-end-safe mt-auto">
                    <p className="text-brand">{formatMoney(product.price)}</p>
                    <button disabled={product.stockQuantity == 0} onClick={handleAddItem} className="add-button">
                        <i className="fa-solid fa-cart-shopping mr-2"></i>
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
