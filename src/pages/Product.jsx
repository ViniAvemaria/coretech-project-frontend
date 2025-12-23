import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { formatMoney } from "../utils/formatMoney";
import { useCart } from "../contexts/CartContext";

const Product = () => {
    const { addToCart } = useCart();
    const { state } = useLocation();

    const product = state?.product;
    const from = state?.from;

    const contentRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const observer = new ResizeObserver(() => {
            const height = contentRef.current.getBoundingClientRect().height;
            imageRef.current.style.height = `${height}px`;
        });

        observer.observe(contentRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="max-w-[1200px] w-full py-16">
            <div className="flex flex-col w-fit text-primary-text dark:text-primary-text-dark mb-6 gap-4">
                <Link to={from} className="text-brand">
                    <i className="fa-solid fa-arrow-left mr-2"></i>
                    {from == "/" ? "Back to Products" : "Back to Cart"}
                </Link>
            </div>
            <div className="flex text-primary-text dark:text-primary-text-dark gap-10">
                <div className="w-1/2 relative">
                    <img
                        ref={imageRef}
                        src={product.image}
                        alt={product.name}
                        className="w-full object-cover rounded-2xl border border-border dark:border-border-dark"
                    />
                    <p className="absolute bottom-3 right-3 text-xs text-white bg-black/60 px-2 py-1 rounded-md">
                        Photo by{" "}
                        <a
                            href={product.photoCredit.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                        >
                            {product.photoCredit.name}
                        </a>{" "}
                        on {product.photoCredit.source}
                    </p>
                </div>
                <div
                    ref={contentRef}
                    className="flex flex-col w-1/2 h-fit gap-6 bg-header dark:bg-header-dark border border-border dark:border-border-dark rounded-2xl p-8"
                >
                    <p className="text-lg">
                        <i className="fa-solid fa-star mr-2 text-yellow-400"></i>
                        {product.rating}
                    </p>
                    <p className="text-lg">{product.name}</p>

                    <p className="text-xl text-brand">{formatMoney(product.price)}</p>

                    <div>
                        <p>Description</p>
                        <p className="text-muted-text-dark dark:text-muted-text mt-2">{product.description}</p>
                    </div>

                    <div>
                        <p>Specifications</p>
                        <ul className="flex flex-col gap-2 list-disc pl-5 marker:text-brand text-muted-text-dark dark:text-muted-text mt-2">
                            {product.specifications.map((spec, index) => (
                                <li key={index}>{spec}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-2">
                        {product.inStock ? (
                            <p className="py-3 px-4 rounded-xl text-green-500 bg-green-500/10">
                                <i className="fa-solid fa-check mr-2"></i>
                                In Stock
                            </p>
                        ) : (
                            <p className="py-3 px-4 rounded-xl text-red-500 bg-red-500/10">
                                <i className="fa-solid fa-x mr-2"></i>
                                Out of Stock
                            </p>
                        )}
                        <button
                            disabled={!product.inStock}
                            onClick={() => addToCart(product)}
                            className="add-button py-3.5 rounded-xl w-full mt-4"
                        >
                            <i className="fa-solid fa-cart-shopping mr-2"></i>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
