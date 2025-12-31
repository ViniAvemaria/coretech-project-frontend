import { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { formatMoney } from "../utils/formatMoney";
import { useCart } from "../contexts/CartContext";
import { getById } from "../api/productService";

const Product = () => {
    const { addToCart } = useCart();
    const { state } = useLocation();
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const from = state?.from;

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await getById(id);
            setProduct(res.data.data);
        };

        fetchProduct();
    }, [id]);

    const contentRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        if (!contentRef.current || !imageRef.current) return;

        const observer = new ResizeObserver(() => {
            if (!contentRef.current || !imageRef.current) return;
            const height = contentRef.current.getBoundingClientRect().height;
            imageRef.current.style.height = `${height}px`;
        });

        observer.observe(contentRef.current);
        return () => observer.disconnect();
    }, [product]);

    return (
        <div className="max-w-[1200px] w-full">
            <div className="flex flex-col w-fit text-primary-text dark:text-primary-text-dark mb-6 gap-4">
                <Link to={from} className="text-brand">
                    <i className="fa-solid fa-arrow-left mr-2"></i>
                    Back
                </Link>
            </div>
            {product && (
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
                                {product.photoCredit.authorName}
                            </a>{" "}
                            on {product.photoCredit.source}
                        </p>
                    </div>

                    <div
                        ref={contentRef}
                        className="flex flex-col w-1/2 h-fit gap-6 bg-header dark:bg-header-dark border border-border dark:border-border-dark rounded-2xl p-8"
                    >
                        <p className="">
                            <i className="fa-solid fa-star mr-2 text-yellow-400"></i>
                            {product.rating}
                        </p>
                        <p className="">{product.name}</p>

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
                            {product.stockQuantity != 0 ? (
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
                                disabled={product.stockQuantity == 0}
                                onClick={() => addToCart(product)}
                                className="add-button py-3.5 rounded-xl w-full mt-4"
                            >
                                <i className="fa-solid fa-cart-shopping mr-2"></i>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Product;
