const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-4 text-primary-text dark:text-primary-text-dark">
            <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-lg font-medium">Loading...</span>
        </div>
    );
};

export default Loading;
