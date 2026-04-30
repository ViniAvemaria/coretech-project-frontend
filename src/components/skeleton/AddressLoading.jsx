import React from "react";

const AddressLoading = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between">
                <div className="relative skeleton-item rounded-lg h-8 w-40 overflow-hidden">
                    <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                </div>

                <div className="relative skeleton-item rounded-lg h-8 w-20 overflow-hidden">
                    <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
                </div>
            </div>

            <div className="relative skeleton-item rounded-lg h-40 overflow-hidden">
                <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-skeleton-shimmer dark:via-skeleton-shimmer-dark to-transparent" />
            </div>
        </div>
    );
};

export default AddressLoading;
