const ReviewLoading = () => {
    return (
        <div className=" w-full mt-7 p-8 max-[500px]:p-4 bg-header dark:bg-header-dark border border-border dark:border-border-dark rounded-lg">
            <div className="flex gap-10 max-[876px]:flex-col">
                <div className="flex flex-col flex-1 gap-6 max-[876px]:order-2">
                    <div className="skeleton-item  relative w-1/2 h-8 overflow-hidden rounded-lg">
                        <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                    </div>

                    <div className="skeleton-item  relative h-40 overflow-hidden rounded-lg">
                        <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                    </div>

                    <div className="skeleton-item  relative w-2/3 h-8 overflow-hidden rounded-lg">
                        <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                    </div>
                </div>

                <div className="flex flex-col flex-1 gap-6 items-center max-[876px]:order-1">
                    <div className="skeleton-item relative place-self-center w-1/3 h-8 overflow-hidden rounded-lg">
                        <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                    </div>

                    <div className="skeleton-item relative place-self-center w-1/4 h-8 overflow-hidden rounded-lg">
                        <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                    </div>

                    <div className="skeleton-item relative w-2/3 h-40 overflow-hidden rounded-lg">
                        <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                    </div>
                </div>
            </div>

            <hr className="mt-10 mb-10 text-muted-text-dark dark:text-muted-text" />

            <div className="skeleton-item relative w-60 h-8 overflow-hidden rounded-lg">
                <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
            </div>

            <div className="flex flex-col gap-4 mt-8">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i}>
                        <div className="skeleton-item relative h-38 overflow-hidden rounded-lg">
                            <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewLoading;
