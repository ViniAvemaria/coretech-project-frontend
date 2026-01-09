const Review = ({ review }) => {
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
        <div className="flex flex-col gap-4 text-primary-text dark:text-primary-text-dark bg-card dark:bg-card-dark py-6 px-8 rounded-xl border border-border dark:border-border-dark">
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <p>{renderStars(review.rating)}</p>
                    <p className="text-muted-text-dark dark:text-muted-text">{review.rating}</p>
                </div>
                <p className="text-muted-text-dark dark:text-muted-text">
                    {new Date(review.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    })}
                </p>
            </div>
            <p>{review.comment}</p>
            <p className="text-muted-text-dark dark:text-muted-text">{`-- ${review.firstName} ${review.lastName}`}</p>
        </div>
    );
};

export default Review;
