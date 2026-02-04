import { Link } from "react-router-dom";
import { formatMoney } from "../utils/formatMoney";

const ProductCardDashboard = ({ product, setProductModalObj, handleDelete }) => {
    return (
        <div className="grid grid-cols-[80px_1fr] gap-2 text-primary-text dark:text-primary-text-dark bg-header dark:bg-header-dark px-3 py-5 border-b last:border-b-0 border-border dark:border-border-dark">
            <div className="h-21">
                <img src={product.image} alt={product.name} className="w-20 h-full object-cover rounded-lg" />
            </div>
            <div className="flex min-w-0">
                <div className="flex flex-col justify-between w-full">
                    <span className="truncate hover:cursor-pointer hover:text-brand transition-color duration-300 ease">
                        <Link to={`/product/${product.id}`} state={{ from: location.pathname }}>
                            {product.name}
                        </Link>
                    </span>
                    <p className="text-muted-text-dark dark:text-muted-text text-sm capitalize">{product.category}</p>
                    <div className="flex justify-between items-center">
                        <p>{formatMoney(product.price)}</p>
                        {product.stockQuantity != 0 ? (
                            <p className="py-1 px-2 rounded-lg text-green-500 bg-green-500/10 text-sm">In Stock</p>
                        ) : (
                            <p className="py-1 px-2 rounded-lg text-red-500 bg-red-500/10 text-sm">Out of Stock</p>
                        )}
                    </div>
                </div>
            </div>
            <div className="col-start-2 flex gap-2 text-sm">
                <button
                    onClick={() =>
                        setProductModalObj({
                            action: "edit",
                            product: product,
                        })
                    }
                    className="flex-1 bg-edit-button dark:bg-edit-button-dark text-brand py-1.5 px-2 rounded-lg cursor-pointer hover:bg-edit-hover hover:dark:bg-edit-hover-dark transition-colors duration-300 ease"
                >
                    <i className="fa-solid fa-pen mr-2"></i>
                    Edit
                </button>
                <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 bg-edit-button dark:bg-edit-button-dark text-red-500 py-1.5 px-2 rounded-lg cursor-pointer hover:bg-edit-hover hover:dark:bg-edit-hover-dark transition-colors duration-300 ease"
                >
                    <i className="fa-solid fa-trash-can mr-2"></i>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ProductCardDashboard;
