import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useOrders } from "../contexts/OrderContext";
import Loading from "../components/Loading";
import { formatMoney } from "../utils/formatMoney";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Order = () => {
    const { id } = useParams();
    const { getOrderById, cancelOrder } = useOrders();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cancelLoading, setCancelLoading] = useState(false);
    const statusStyles = {
        PENDING:
            "text-yellow-700 bg-yellow-100 border border-yellow-700 dark:text-yellow-400 dark:bg-yellow-600/20 dark:border-yellow-400",
        PAID: "text-blue-700 bg-blue-100 border border-blue-700 dark:text-blue-400 dark:bg-blue-600/20 dark:border-blue-400",
        SHIPPED:
            "text-purple-700 bg-purple-100 border border-purple-700 dark:text-purple-400 dark:bg-purple-600/20 dark:border-purple-400",
        DELIVERED:
            "text-green-700 bg-green-100 border border-green-700 dark:text-green-400 dark:bg-green-600/20 dark:border-green-400",
        CANCELLED:
            "text-red-700 bg-red-100 border border-red-700 dark:text-red-400 dark:bg-red-600/20 dark:border-red-400",
    };

    const statusIcons = {
        PENDING: <i className="fa-regular fa-clock mr-2" />,
        PAID: <i className="fa-solid fa-dollar-sign mr-2" />,
        SHIPPED: <i className="fa-solid fa-truck mr-2" />,
        DELIVERED: <i className="fa-solid fa-check mr-2" />,
        CANCELLED: <i className="fa-solid fa-ban mr-2" />,
    };

    const fetchOrder = async () => {
        try {
            const res = await getOrderById(id);
            setOrder(res);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, []);

    const formatOrderId = (id) => {
        return String(id).padStart(5, "0");
    };

    const handleCancel = async () => {
        setCancelLoading(true);
        try {
            await cancelOrder(id);
            await fetchOrder();
            toast.success("Cancelled Successfully");
        } catch (err) {
            if (err.response) {
                toast.error(err.response.data?.message || "Cancelled Failed");
            } else {
                toast.error("Network error");
            }
        } finally {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setCancelLoading(false);
        }
    };

    return (
        <div className="max-w-[800px] w-full py-12">
            {loading ? (
                <div className="flex items-center justify-center h-full w-full">
                    <Loading />
                </div>
            ) : (
                <div className="flex flex-col gap-6 text-primary-text dark:text-primary-text-dark">
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-start">
                            <h1 className="section-title mb-2">{`Order #${formatOrderId(order.id)}`}</h1>
                            <p
                                className={`${statusStyles[order.status]} flex items-center w-fit capitalize py-1 px-2.5 rounded-lg`}
                            >
                                {statusIcons[order.status]}
                                {order.status.toLowerCase()}
                            </p>
                        </div>
                        <p className="text-muted-text-dark dark:text-muted-text text-sm">
                            {`Placed on ${new Date(order.createdAt).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })}`}
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 border border-border dark:border-border-dark rounded-lg bg-header dark:bg-header-dark text-primary-text dark:text-primary-text-dark p-5">
                        <h2>Order Items</h2>
                        {order.items.map((item) => (
                            <div
                                key={item.id}
                                className="flex h-40 gap-4 p-4 border border-border dark:border-border-dark rounded-lg bg-card dark:bg-card-dark"
                            >
                                <img src={item.product.image} alt="" className="w-30 h-full object-cover rounded-lg" />

                                <div className="grid grid-cols-4 gap-2 w-full max-[640px]:grid-cols-1">
                                    <div className="col-span-3 flex flex-col justify-between max-[640px]:col-span-1">
                                        <Link
                                            to={`/product/${item.product.id}`}
                                            className="line-clamp-2 hover:text-brand transition-colors duration-300 ease"
                                        >
                                            {item.product.name}
                                        </Link>
                                        <p className="text-sm text-muted-text-dark dark:text-muted-text line-clamp-2 max-[640px]:line-clamp-1 max-xs:hidden">
                                            {item.product.description}
                                        </p>
                                        <div className="flex gap-2 max-xs:flex-col max-xs:gap-0">
                                            <p className="text-sm text-muted-text-dark dark:text-muted-text">{`Quantity: ${item.quantity}`}</p>
                                            <p className="text-sm text-muted-text-dark dark:text-muted-text">{`Price: ${formatMoney(item.price)}`}</p>
                                        </div>
                                    </div>
                                    <p className="w-full place-self-center text-end">
                                        {formatMoney(item.price * item.quantity)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-3 p-5 bg-header dark:bg-header-dark border border-border dark:border-border-dark rounded-lg text-primary-text dark:text-primary-text-dark shadow-sm">
                        <p className="mb-4">Order Summary</p>
                        <div className="flex justify-between text-muted-text-dark dark:text-muted-text">
                            <p>
                                Subtotal ({order.items.length} {order.items.length == 1 ? "item" : "items"})
                            </p>
                            <p>{formatMoney(order.subtotal)}</p>
                        </div>
                        <div className="flex justify-between text-muted-text-dark dark:text-muted-text">
                            <p>Tax (10%)</p>
                            <p>{formatMoney(order.taxAmount)}</p>
                        </div>
                        <div className="flex justify-between text-muted-text-dark dark:text-muted-text">
                            <p>Shipping</p>
                            <p>{formatMoney(order.shippingAmount)}</p>
                        </div>
                        <hr className="text-muted-text-dark dark:text-muted-text my-2" />
                        <div className="flex justify-between">
                            <p>Total</p>
                            <p className="text-brand">{formatMoney(order.totalPrice)}</p>
                        </div>
                    </div>

                    <button
                        type="submit"
                        onClick={handleCancel}
                        disabled={
                            cancelLoading ||
                            order.status === "PAID" ||
                            order.status === "PROCESSING" ||
                            order.status === "CANCELLED"
                        }
                        className={`${(order.status === "SHIPPED" || order.status === "DELIVERED" || order.status === "CANCELLED") && "hidden"} relative overflow-hidden px-3.5 py-3 rounded-lg text-white transition-colors duration-300 ease cursor-pointer ${cancelLoading ? " bg-red-600/95 cursor-not-allowed" : " bg-red-600 hover:bg-red-500 dark:hover:bg-red-700"}`}
                    >
                        {cancelLoading && (
                            <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/35 to-transparent" />
                        )}
                        <span className="relative z-10">{cancelLoading ? "Cancelling..." : "Cancel Order"}</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default Order;
