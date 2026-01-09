const Row = ({ label, value, total }) => (
    <div className="flex items-center gap-2">
        <span>{label}</span>
        <div className="w-80 h-2 bg-gray-200 dark:bg-border-dark rounded">
            <div className="h-2 bg-yellow-400 rounded" style={{ width: total ? `${(value / total) * 100}%` : "0%" }} />
        </div>
        <span>{value}</span>
    </div>
);

const RatingDistribution = ({ reviews }) => {
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

    return (
        <div className="space-y-1.5">
            <Row label="5" value={stars[5]} total={stars.total} />
            <Row label="4" value={stars[4]} total={stars.total} />
            <Row label="3" value={stars[3]} total={stars.total} />
            <Row label="2" value={stars[2]} total={stars.total} />
            <Row label="1" value={stars[1]} total={stars.total} />
        </div>
    );
};

export default RatingDistribution;
