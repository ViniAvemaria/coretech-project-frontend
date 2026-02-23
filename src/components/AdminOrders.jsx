import { useState, useEffect } from "react";
import { getAllAdmin } from "../api/orderService";
import Loading from "./Loading";
import { formatMoney } from "../utils/formatMoney";
import { useOrders } from "../contexts/OrderContext";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { updateStatus } = useOrders();
    const STATUSES = ["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"];

    const statusStyles = {
        PENDING: "text-yellow-700 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-600/20",
        PAID: "text-blue-700 bg-blue-100 dark:text-blue-400 dark:bg-blue-600/20",
        SHIPPED: "text-purple-700 bg-purple-100 dark:text-purple-400 dark:bg-purple-600/20",
        DELIVERED: "text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-600/20",
        CANCELLED: "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-600/20",
    };

    const fetchOrders = async () => {
        try {
            const res = await getAllAdmin();
            setOrders(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const formatOrderId = (id) => {
        return String(id).padStart(5, "0");
    };

    const handleStatusChange = async (orderId, status) => {
        await updateStatus(orderId, status);
        await fetchOrders();
    };

    return (
        <div className=" text-primary-text dark:text-primary-text-dark mt-6 mb-6">
            <h2 className="mb-6">Orders Management</h2>
            {loading ? (
                <div className="flex items-center justify-center h-full w-full">
                    <Loading />
                </div>
            ) : orders.length === 0 ? (
                <div className="text-primary-text dark:text-primary-text-dark">
                    <div className="flex flex-col items-center gap-5 w-full px-10 py-12 rounded-lg border border-border dark:border-border-dark bg-header dark:bg-header-dark text-primary-text dark:text-primary-text-dark mt-8">
                        <i className="fa-solid fa-box text-5xl text-muted-text-dark dark:text-muted-text"></i>
                        <p className="text-primary-text dark:text-primary-text-dark">No orders yet</p>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="flex flex-col text-primary-text dark:text-primary-text-dark rounded-lg border border-border dark:border-border-dark bg-header dark:bg-header-dark p-5"
                        >
                            <div className="grid grid-cols-3 gap-2">
                                <div className="flex flex-col gap-0.5 col-span-2">
                                    <p>{`Order #${formatOrderId(order.id)}`}</p>
                                    <p className="text-muted-text-dark dark:text-muted-text text-sm">{`${order.userFirstName} ${order.userLastName} (${order.userEmail})`}</p>
                                    <p className="text-muted-text-dark dark:text-muted-text text-sm">
                                        {new Date(order.createdAt).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </p>
                                </div>

                                <div className="flex flex-col justify-between justify-self-end-safe">
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        className={`${statusStyles[order.status]} border-none outline-none focus:outline-none focus:ring-0 cursor-pointer rounded-lg py-px px-1 capitalize`}
                                    >
                                        {STATUSES.map((s) => (
                                            <option key={s} value={s}>
                                                {s.toLowerCase()}
                                            </option>
                                        ))}
                                    </select>
                                    <p className="text-end text-brand">{formatMoney(order.totalPrice)}</p>
                                </div>
                            </div>
                            <hr className="text-muted-text-dark dark:bg-muted-text mt-3 mb-3" />
                            <div className="flex flex-col gap-2">
                                <p className="text-muted-text-dark dark:text-muted-text text-sm">Items:</p>
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex justify-between gap-4">
                                        <p className="text-sm">
                                            {item.product.name}{" "}
                                            <span className="text-muted-text-dark dark:text-muted-text">
                                                x {item.quantity}
                                            </span>
                                        </p>
                                        <p className="text-sm">{formatMoney(item.price * item.quantity)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminOrders;
