import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { formatMoney } from "../utils/formatMoney";
import { useCart } from "../contexts/CartContext";
import Loading from "../components/Loading";
import Review from "../components/Review";
import { useAuth } from "../contexts/AuthContext";
import { useReviews } from "../contexts/ReviewContext";
import { useProducts } from "../contexts/ProductContext";
import { toast } from "react-toastify";

const Row = ({ label, value, total }) => (
    <div className="flex items-center justify-center gap-2">
        <span>{label}</span>
        <div className="max-w-80 w-full h-2 bg-gray-200 dark:bg-border-dark rounded">
            <div className="h-2 bg-yellow-400 rounded" style={{ width: total ? `${(value / total) * 100}%` : "0%" }} />
        </div>
        <span>{value}</span>
    </div>
);

const Product = () => {
    const { user, isAuthenticated } = useAuth();
    const { product, fetchProduct } = useProducts();
    const { reviews, sort, setSort, refreshReviews, addReview } = useReviews();
    const { addItem } = useCart();
    const { id } = useParams();
    const [rating, setRating] = useState(1);
    const [hover, setHover] = useState(0);
    const [userReview, setUserReview] = useState(null);
    const [reviewComment, setReviewComment] = useState("");

    useEffect(() => {
        fetchProduct(id);
    }, [id]);

    useEffect(() => {
        refreshReviews(id);
    }, [sort]);

    useEffect(() => {
        if (isAuthenticated) {
            const findUserReview = () => {
                for (const review of reviews) {
                    if (review.userId === user.id) {
                        setUserReview(review);
                        return;
                    }
                }
                setUserReview(null);
            };

            findUserReview();
        }
    }, [reviews]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!isAuthenticated) {
                throw new Error("You must sign in to submit a review");
            }
            const payload = {
                comment: reviewComment,
                rating: rating,
            };
            await addReview(product.id, payload);
            fetchProduct(product.id);
            toast.success("Review submitted successfully");
            setReviewComment("");
            setRating(1);
        } catch (err) {
            toast.error(err.message || "Failed to submit review");
        }
    };

    const getStarCounts = (reviews) => {
        const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, total: 0 };

        reviews.forEach((r) => {
            const star = Math.floor(r.rating);
            if (counts[star] !== undefined) {
                counts[star]++;
                counts.total++;
            }
        });

        return counts;
    };

    const stars = getStarCounts(reviews);

    const handleAddItem = async () => {
        try {
            if (!isAuthenticated) {
                throw new Error("You must sign in to use the cart");
            }
            await addItem({
                id: product.id,
                quantity: 1,
            });
            toast.success("Product added to cart");
        } catch (err) {
            toast.error(err.message || "Failed to add item to cart");
        }
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
                <div className="flex items-center justify-center h-full">
                    <Loading />
                </div>
            ) : (
                <>
                    <div className="flex max-md:flex-col text-primary-text dark:text-primary-text-dark gap-7 max-lg:gap-0">
                        <div className="w-1/2 max-md:w-full relative">
                            <img
                                ref={imageRef}
                                src={product.image}
                                alt={product.name}
                                className="w-full object-cover rounded-xl max-lg:rounded-tr-none max-lg:rounded-br-none max-lg:border-r-0 border border-border dark:border-border-dark max-md:rounded-bl-none max-md:rounded-tr-lg max-md:border-b-0"
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
                            className="flex flex-col w-1/2 max-md:w-full h-fit gap-6 bg-header dark:bg-header-dark border border-border dark:border-border-dark rounded-xl p-8 max-lg:rounded-tl-none max-lg:rounded-bl-none max-md:rounded-tr-none max-md:rounded-bl-lg"
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
                                    onClick={handleAddItem}
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
                        className=" mt-7 p-8 bg-header dark:bg-header-dark border border-border dark:border-border-dark rounded-xl text-primary-text dark:text-primary-text-dark"
                    >
                        <div className="flex max-[876px]:flex-col gap-6">
                            <div className="flex flex-col gap-6 w-1/2 max-[876px]:w-full max-[876px]:order-2">
                                <h2 className="section-title m-0 place-self-center">Leave a Review</h2>
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
                                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                                    <p>Your Review</p>
                                    <textarea
                                        className="input h-32 resize-none"
                                        value={reviewComment}
                                        maxLength={1000}
                                        name="review"
                                        id="review"
                                        onChange={(e) => setReviewComment(e.target.value)}
                                        placeholder="Share your experience with this product..."
                                        required
                                    ></textarea>
                                    <p className="text-sm text-muted-text-dark dark:text-muted-text">
                                        {reviewComment.length}/1000
                                    </p>
                                    <button
                                        type="submit"
                                        className="mt-2 bg-brand hover:bg-brand-hover cursor-pointer transition-colors duration-300 ease text-white py-3 px-4.5 rounded-xl"
                                    >
                                        Submit Review
                                    </button>
                                </form>
                            </div>

                            <div className="flex flex-col items-center justify-center w-1/2 max-[876px]:w-full gap-8 max-[876px]:order-1">
                                <div className="flex flex-col items-center gap-1">
                                    <h2 className="font-bold text-4xl">{product.rating}</h2>
                                    <p>{renderStars(product.rating)}</p>
                                    <p>{`${reviews.length} ${reviews.length < 2 ? "review" : "reviews"}`}</p>
                                </div>
                                <div className="space-y-1.5 w-full">
                                    <Row label="5" value={stars[5]} total={stars.total} />
                                    <Row label="4" value={stars[4]} total={stars.total} />
                                    <Row label="3" value={stars[3]} total={stars.total} />
                                    <Row label="2" value={stars[2]} total={stars.total} />
                                    <Row label="1" value={stars[1]} total={stars.total} />
                                </div>
                            </div>
                        </div>

                        <hr className="mt-10 mb-10 text-muted-text-dark dark:text-muted-text" />

                        {userReview && (
                            <div className="flex flex-col gap-2">
                                <h2 className="section-title">Your Review</h2>
                                <Review productId={product.id} review={userReview} />
                                <hr className="mt-10 mb-10 text-muted-text-dark dark:text-muted-text" />
                            </div>
                        )}

                        <div className="flex justify-between items-center mb-6">
                            <h2 className="section-title mb-0">Customer reviews</h2>
                            <select
                                id="sort-select"
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className="input w-fit"
                            >
                                <option value="newest">Newest</option>
                                <option value="oldest">Oldest</option>
                                <option value="highest">Highest rating</option>
                                <option value="lowest">Lowest rating</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-5">
                            {reviews.map((review) => (
                                <Review key={review.id} productId={product.id} review={review} />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Product;
