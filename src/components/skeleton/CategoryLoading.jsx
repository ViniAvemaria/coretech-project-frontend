const CategoryLoading = () => {
    return (
        <div className="flex items-center w-screen min-w-[360px] gap-2 px-10 absolute border-b border-border dark:border-border-dark h-18 left-0 bg-header dark:bg-header-dark">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="relative skeleton-item rounded-lg h-10 w-32 overflow-hidden">
                    <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                </div>
            ))}
        </div>
    );
};

export default CategoryLoading;
