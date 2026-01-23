import { createContext, useContext, useState } from "react";
import { getAll, create as createReview, update as updateReview, deleteReview } from "../api/reviewService";
import { toast } from "react-toastify";

const ReviewContext = createContext(null);

export const ReviewProvider = ({ children }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sort, setSort] = useState("newest");

    const refreshReviews = async (productId) => {
        setLoading(true);
        try {
            const res = await getAll(productId, sort);
            setReviews(res.data.data);
        } catch (err) {
            console.error(err);
            setReviews([]);
        } finally {
            setLoading(false);
        }
    };

    const addReview = async (productId, data) => {
        await createReview(productId, data);
        await refreshReviews(productId);
    };

    const editReview = async (id, productId, data) => {
        await updateReview(id, data);
        await refreshReviews(productId);
    };

    const removeReview = async (id, productId) => {
        await deleteReview(id);
        await refreshReviews(productId);
    };

    return (
        <ReviewContext.Provider
            value={{
                reviews,
                loading,
                sort,
                setSort,
                refreshReviews,
                addReview,
                editReview,
                removeReview,
            }}
        >
            {children}
        </ReviewContext.Provider>
    );
};

export const useReviews = () => useContext(ReviewContext);
