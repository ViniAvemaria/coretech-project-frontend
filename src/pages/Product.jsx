import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { formatMoney } from "../utils/formatMoney";
import { useCart } from "../contexts/CartContext";
import { getById } from "../api/productService";
import { getAll } from "../api/reviewService";
import Loading from "../components/Loading";
import Review from "../components/Review";
import RatingDistribution from "../components/RatingDistribution";

const Product = () => {
    const { addItem } = useCart();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(1);
    const [hover, setHover] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await getById(id);
            setProduct(res.data.data);
        };

        const fetchReview = async () => {
            const res = await getAll(id);
            setReviews(res.data.data);
        };

        fetchProduct();
        fetchReview();
    }, [id]);

    const getValue = (e, star) => {
        const half = e.nativeEvent.offsetX < e.currentTarget.offsetWidth / 2;
        return Math.max(1, half ? star - 0.5 : star);
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
        <div className="max-w-[1100px] w-full py-12">
            {!product ? (
                <Loading />
            ) : (
                <>
                    <div className="flex text-primary-text dark:text-primary-text-dark gap-7">
                        <div className="w-1/2 relative">
                            <img
                                ref={imageRef}
                                src={product.image}
                                alt={product.name}
                                className="w-full object-cover rounded-xl border border-border dark:border-border-dark"
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
                            className="flex flex-col w-1/2 h-fit gap-6 bg-header dark:bg-header-dark border border-border dark:border-border-dark rounded-xl p-8"
                        >
                            <div className="flex gap-2">
                                <p>{renderStars(product.rating)}</p>
                                <p>{product.rating}</p>
                            </div>
                            <p>{product.name}</p>

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
                                    onClick={() =>
                                        addItem({
                                            id: product.id,
                                            quantity: 1,
                                        })
                                    }
                                    className="add-button py-3.5 rounded-xl w-full mt-4"
                                >
                                    <i className="fa-solid fa-cart-shopping mr-2"></i>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        id="review-section"
                        className="mt-7 p-8 bg-header dark:bg-header-dark border border-border dark:border-border-dark rounded-xl text-primary-text dark:text-primary-text-dark"
                    >
                        <div className="flex gap-6">
                            <div className="flex flex-col gap-6 w-1/2">
                                <h2 className="section-title m-0">Leave a Review</h2>
                                <div>
                                    <p className="mb-3">Rating</p>
                                    <div className="flex items-center">
                                        <div>
                                            {[1, 2, 3, 4, 5].map((star) => {
                                                const value = hover || rating;
                                                return (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onMouseMove={(e) => setHover(getValue(e, star))}
                                                        onMouseLeave={() => setHover(0)}
                                                        onClick={(e) => setRating(getValue(e, star))}
                                                        className="cursor-pointer"
                                                    >
                                                        <i
                                                            className={
                                                                value >= star
                                                                    ? "fa-solid fa-star text-3xl text-yellow-400"
                                                                    : value >= star - 0.5
                                                                    ? "fa-regular fa-star-half-stroke text-3xl text-yellow-400"
                                                                    : "fa-regular fa-star text-3xl text-yellow-400"
                                                            }
                                                        />
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        <p className="ml-3 text-muted-text-dark dark:text-muted-text">{`${rating} ${
                                            rating < 2 ? "star" : "stars"
                                        }`}</p>
                                    </div>
                                </div>
                                <div>
                                    <p>Your Review</p>
                                    <textarea
                                        className="input h-32 resize-none mt-2"
                                        name="review"
                                        id="review"
                                        placeholder="Share your experience with this product..."
                                    ></textarea>
                                </div>
                                <button
                                    type="button"
                                    className="bg-brand hover:bg-brand-hover cursor-pointer transition-colors duration-300 ease text-white py-3 px-4.5 rounded-lg"
                                >
                                    Submit Review
                                </button>
                            </div>

                            <div className="flex flex-col items-center justify-center w-1/2 gap-8">
                                <div className="flex flex-col items-center gap-1">
                                    <h2 className="font-bold text-4xl">{product.rating}</h2>
                                    <p>{renderStars(product.rating)}</p>
                                    <p>{`${reviews.length} ${reviews.length < 2 ? "review" : "reviews"}`}</p>
                                </div>
                                <RatingDistribution reviews={reviews} />
                            </div>
                        </div>

                        <hr className="mt-10 mb-10 text-muted-text-dark dark:text-muted-text" />

                        <h2 className="section-title">Customer reviews</h2>
                        {reviews.map((review) => (
                            <Review key={review.id} review={review} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Product;
