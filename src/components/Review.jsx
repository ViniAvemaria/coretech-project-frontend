import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useReviews } from "../contexts/ReviewContext";
import { useProducts } from "../contexts/ProductContext";
import { toast } from "react-toastify";

const Review = ({ productId, review }) => {
    const { user, isAuthenticated } = useAuth();
    const { editReview, removeReview } = useReviews();
    const { fetchProduct } = useProducts();
    const [rating, setRating] = useState(review.rating);
    const [hover, setHover] = useState(0);
    const [editing, setEditing] = useState(false);
    const reviewComment = review.comment;

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                comment: e.target.review.value,
                rating: rating,
            };
            console.log(payload);

            await editReview(review.id, productId, payload);
            fetchProduct(productId);
            toast.success("Review edited successfully");
            setEditing(false);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to edit review");
        }
    };

    const handleDelete = async () => {
        try {
            await removeReview(review.id, productId);
            fetchProduct(productId);
            toast.success("Review deleted successfully");
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete review");
        }
    };

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

    return (
        <div className="flex flex-col gap-4 text-primary-text dark:text-primary-text-dark bg-card dark:bg-card-dark py-5 px-8 rounded-xl border border-border dark:border-border-dark">
            <div className="flex justify-between">
                <div className="flex gap-2">
                    {editing ? (
                        <div className="flex flex-col gap-1.5">
                            <h2>Rating</h2>
                            <div className="flex">
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
                                                            ? "fa-solid fa-star text-lg text-yellow-400"
                                                            : value >= star - 0.5
                                                            ? "fa-regular fa-star-half-stroke text-lg text-yellow-400"
                                                            : "fa-regular fa-star text-lg text-yellow-400"
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
                    ) : (
                        <>
                            <p>{renderStars(review.rating)}</p>
                            <p className="text-muted-text-dark dark:text-muted-text">{review.rating}</p>
                        </>
                    )}
                </div>
                <div className="flex gap-2">
                    {review.createdAt != review.updatedAt && (
                        <span className="flex items-center text-xs px-2 py-0.5 rounded bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-200">
                            Edited
                        </span>
                    )}
                    <p className="text-muted-text-dark dark:text-muted-text">
                        {new Date(review.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}
                    </p>
                </div>
            </div>

            {editing ? (
                <form onSubmit={handleEdit} className="flex flex-col gap-1.5">
                    <h2>Your review</h2>
                    <textarea
                        className="input h-fit resize-none bg-gray-100 dark:bg-gray-700"
                        name="review"
                        id="review"
                        defaultValue={reviewComment}
                        autoFocus
                        onFocus={(e) => {
                            const v = e.target.value.length;
                            e.target.setSelectionRange(v, v);
                        }}
                    />
                    <div className="flex gap-4 mt-2">
                        <button
                            type="submit"
                            className="px-3 py-1.5 bg-brand text-white hover:bg-brand-hover rounded-lg transition-colors duration-300 ease cursor-pointer"
                        >
                            <i className="fa-regular fa-floppy-disk mr-2"></i>
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => setEditing(false)}
                            className="px-3 py-1.5 bg-gray-300 dark:bg-gray-500 text-black dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600 rounded-lg transition-colors duration-300 ease cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <p>{review.comment}</p>
            )}

            {!editing && (
                <div className="flex justify-between items-center">
                    <p className="text-muted-text-dark dark:text-muted-text">
                        {`-- ${review.firstName} ${review.lastName ? review.lastName : ""}`}
                    </p>
                    {isAuthenticated && review.userId == user.id && (
                        <div className="flex gap-5">
                            <button
                                onClick={() => setEditing(true)}
                                className="text-blue-600 hover:text-blue-500 cursor-pointer transition-colors duration-300 ease"
                            >
                                <i className="fa-solid fa-pen"></i>
                            </button>
                            <button
                                onClick={handleDelete}
                                className="text-red-600 hover:text-red-500 cursor-pointer transition-colors duration-300 ease"
                            >
                                <i className="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Review;
