const HomeLoading = () => {
    return (
        <>
            <div className="skeleton-item relative h-10 overflow-hidden rounded-lg mt-26 mb-6 w-30 place-self-end-safe">
                <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(275px,1fr))] place-items-center gap-8">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex flex-col gap-6 w-[275px] border rounded-lg border-border dark:border-border-dark overflow-hidden shadow-sm bg-header dark:bg-header-dark"
                    >
                        <div className="skeleton-item relative h-85 overflow-hidden rounded-t-lg">
                            <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                        </div>

                        <div className="flex flex-col gap-4 h-56 p-5 pt-0">
                            <div className="skeleton-item relative h-8 w-3/4 overflow-hidden rounded-lg">
                                <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                            </div>

                            <div className="skeleton-item relative h-8 overflow-hidden rounded-lg">
                                <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                            </div>

                            <div className="skeleton-item relative h-8 w-3/4 overflow-hidden rounded-lg">
                                <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                            </div>

                            <div className="flex gap-10 mt-auto">
                                <div className="flex-1 skeleton-item relative h-8 overflow-hidden rounded-lg">
                                    <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                                </div>
                                <div className="flex-1 skeleton-item relative h-8 overflow-hidden rounded-lg">
                                    <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default HomeLoading;
