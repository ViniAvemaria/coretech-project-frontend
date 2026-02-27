const OrderLoading = () => {
    return (
        <>
            <div className="flex justify-between">
                <div className="flex flex-col gap-4">
                    <div className="relative skeleton-item rounded-lg h-8 w-42 overflow-hidden">
                        <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                    </div>

                    <div className="relative skeleton-item rounded-lg h-8 w-32 overflow-hidden">
                        <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                    </div>
                </div>

                <div className="relative skeleton-item rounded-lg h-8 w-28 overflow-hidden">
                    <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                </div>
            </div>

            <div className="flex flex-col gap-4 mt-6 bg-header dark:bg-header-dark border border-border dark:border-border-dark rounded-lg p-5">
                <div className="relative skeleton-item rounded-lg h-30 overflow-hidden">
                    <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                </div>

                <div className="relative skeleton-item rounded-lg h-30 overflow-hidden">
                    <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                </div>

                <div className="relative skeleton-item rounded-lg h-30 overflow-hidden">
                    <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                </div>
            </div>

            <div className="flex flex-col gap-4 mt-6 bg-header dark:bg-header-dark border border-border dark:border-border-dark rounded-lg p-5">
                <div className="flex justify-between">
                    <div className="relative skeleton-item rounded-lg h-8 w-36 overflow-hidden">
                        <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                    </div>

                    <div className="relative skeleton-item rounded-lg h-8 w-18 overflow-hidden">
                        <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="relative skeleton-item rounded-lg h-8 w-24 overflow-hidden">
                        <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                    </div>

                    <div className="relative skeleton-item rounded-lg h-8 w-18 overflow-hidden">
                        <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="relative skeleton-item rounded-lg h-8 w-36 overflow-hidden">
                        <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                    </div>

                    <div className="relative skeleton-item rounded-lg h-8 w-18 overflow-hidden">
                        <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                    </div>
                </div>

                <hr className="text-muted-text-dark dark:text-muted-text my-2" />

                <div className="flex justify-between">
                    <div className="relative skeleton-item rounded-lg h-8 w-20 overflow-hidden">
                        <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                    </div>

                    <div className="relative skeleton-item rounded-lg h-8 w-18 overflow-hidden">
                        <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                    </div>
                </div>
            </div>

            <div className="relative skeleton-item rounded-lg h-12 overflow-hidden mt-6">
                <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
            </div>
        </>
    );
};

export default OrderLoading;
