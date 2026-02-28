const CartLoading = () => {
    return (
        <>
            <div className="relative skeleton-item rounded-lg h-8 w-40 overflow-hidden">
                <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
            </div>
            <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-8 mt-10">
                <div className="min-[1000px]:col-span-2 flex flex-col gap-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div
                            key={i}
                            className="flex gap-8 max-xs:gap-2 h-50 bg-header dark:bg-header-dark border border-border dark:border-border-dark rounded-lg p-5"
                        >
                            <div className="relative skeleton-item rounded-lg w-40 h-full overflow-hidden">
                                <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                            </div>

                            <div className="flex flex-col gap-4 w-full max-xs:items-end-safe">
                                <div className="relative skeleton-item rounded-lg w-[80%] h-8 overflow-hidden">
                                    <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                                </div>

                                <div className="relative skeleton-item rounded-lg w-[50%] h-8 overflow-hidden">
                                    <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                                </div>

                                <div className="flex justify-between mt-auto">
                                    <div className="relative skeleton-item rounded-lg w-30 max-sm:w-20 h-8 overflow-hidden max-xs:hidden">
                                        <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                                    </div>
                                    <div className="relative skeleton-item rounded-lg w-30 max-sm:w-20 h-8 overflow-hidden">
                                        <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-3 sticky top-10 h-fit p-5 bg-header dark:bg-header-dark border border-border dark:border-border-dark rounded-lg text-primary-text dark:text-primary-text-dark shadow-sm">
                    <div className="flex flex-col gap-4">
                        <div className="relative skeleton-item rounded-lg h-8 w-[65%] overflow-hidden mb-2">
                            <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                        </div>

                        <div className="flex justify-between">
                            <div className="relative skeleton-item rounded-lg h-8 w-20 overflow-hidden">
                                <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                            </div>
                            <div className="relative skeleton-item rounded-lg h-8 w-20 overflow-hidden">
                                <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <div className="relative skeleton-item rounded-lg h-8 w-20 overflow-hidden">
                                <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                            </div>
                            <div className="relative skeleton-item rounded-lg h-8 w-20 overflow-hidden">
                                <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                            </div>
                        </div>

                        <hr className="text-muted-text-dark dark:bg-muted-text " />

                        <div className="flex justify-between">
                            <div className="relative skeleton-item rounded-lg h-8 w-20 overflow-hidden">
                                <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                            </div>
                            <div className="relative skeleton-item rounded-lg h-8 w-20 overflow-hidden">
                                <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                            </div>
                        </div>

                        <div className="relative skeleton-item rounded-lg h-8 overflow-hidden">
                            <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartLoading;
