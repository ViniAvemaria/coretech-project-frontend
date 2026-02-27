const ProductLoading = () => {
    return (
        <div className="max-w-[1100px] w-full py-12">
            <div className="flex max-[600px]:flex-col gap-6 bg-header dark:bg-header-dark border border-border dark:border-border-dark rounded-lg p-8 max-[500px]:p-4">
                <div className="skeleton-item min-[600px]:hidden relative w-1/2 h-8 overflow-hidden rounded-lg">
                    <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                </div>

                <div className="skeleton-item min-[600px]:flex-1 h-150 relative overflow-hidden rounded-lg">
                    <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                </div>

                <div className="flex flex-1 h-fit flex-col gap-8">
                    <div className="skeleton-item relative h-8 overflow-hidden rounded-lg">
                        <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                    </div>

                    <div className="skeleton-item relative w-3/4 h-8 overflow-hidden rounded-lg">
                        <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                    </div>

                    <div className="flex flex-col gap-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i}>
                                <div className="skeleton-item relative w-[50%] h-8 overflow-hidden rounded-lg">
                                    <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="skeleton-item relative w-3/4 h-8 overflow-hidden rounded-lg">
                        <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductLoading;
