import { useState } from "react";
import { useOrders } from "../contexts/OrderContext";
import { formatMoney } from "../utils/formatMoney";
import { useCart } from "../contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AddressSection from "../components/AddressSection";
import { Square, SquareCheck, Check } from "lucide-react";

const Checkout = () => {
    const [activeTab, setActiveTab] = useState("address");
    const [shippingAddress, setShippingAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const navigate = useNavigate();
    const { createOrder, createLoading } = useOrders();
    const { items, itemCount, totalPrice, fetchCart } = useCart();
    const subTotal = totalPrice;
    const tax = subTotal * 0.1;
    const shipping = 10;
    const cartTotal = subTotal + tax + shipping;

    const displayPayment = {
        card: {
            title: <p>Credit Card</p>,
            icon: (
                <div className="min-w-5 flex justify-center items-center">
                    <i className="fa-solid fa-credit-card min-w-5"></i>
                </div>
            ),
        },
        paypal: {
            title: <p>Paypal</p>,
            icon: (
                <div className="min-w-5 flex justify-center items-center">
                    <i className="fa-brands fa-paypal text-lg"></i>
                </div>
            ),
        },
        pix: {
            title: <p>Pix</p>,
            icon: (
                <div className="min-w-5 flex justify-center items-center">
                    <i className="fa-brands fa-pix text-lg min-w-5"></i>
                </div>
            ),
        },
        boleto: {
            title: <p>Boleto</p>,
            icon: (
                <div className="min-w-5 flex justify-center items-center">
                    <i className="fa-brands fa-pix text-lg min-w-5"></i>
                </div>
            ),
        },
    };

    const handlePurchase = async () => {
        try {
            const payload = {
                addressId: shippingAddress.id,
                paymentMethod: paymentMethod.toUpperCase(),
                items: items.map((item) => ({
                    productId: item.product.id,
                    quantity: item.quantity,
                })),
            };

            await createOrder(payload);
            await fetchCart();
            toast.success("Purchase Successful");
        } catch (err) {
            if (err.response) {
                toast.error(err.response.data?.message || "Purchase Failed");
            } else {
                toast.error("Network error");
            }
        } finally {
            navigate("/profile");
        }
    };

    return (
        <div className="max-w-[1200px] w-full py-12">
            <h2 className="section-title">Checkout</h2>

            <div className="w-full flex justify-center gap-6 max-xs:gap-4 text-muted-text-dark dark:text-muted-text my-10">
                <div className="flex flex-col items-center">
                    <div className="flex">
                        <span
                            className={`flex border-2 bg-brand border-brand text-primary-text dark:text-primary-text-dark py-2.5 px-3.5 rounded-3xl`}
                        >
                            {activeTab !== "address" ? (
                                <Check size={18} className="h-6 text-white" />
                            ) : (
                                <p className="flex items-center justify-center min-w-4.5">1</p>
                            )}
                        </span>
                    </div>
                    <p className="text-primary-text dark:text-primary-text-dark mt-2">Shipping</p>
                </div>

                <span
                    className={`max-w-30 w-full h-0.5 inline-block mt-5.75 rounded-lg ${activeTab !== "address" ? "bg-brand" : "bg-muted-text-dark dark:bg-muted-text"}`}
                ></span>

                <div className="flex flex-col items-center">
                    <div className="flex">
                        <span
                            className={`flex border-2 text-primary-text dark:text-primary-text-dark py-2.5 px-3.5 rounded-3xl ${activeTab === "payment" || activeTab === "review" ? "bg-brand border-brand" : " border-muted-text-dark dark:border-muted-text"}`}
                        >
                            {activeTab === "review" ? (
                                <Check size={18} className="h-6 text-white" />
                            ) : (
                                <p
                                    className={`flex items-center justify-center min-w-4.5 ${activeTab === "payment" ? "text-white" : "text-muted-text-dark dark:text-muted-text"}`}
                                >
                                    2
                                </p>
                            )}
                        </span>
                    </div>
                    <p
                        className={` mt-2 ${activeTab === "payment" || activeTab === "review" ? "text-primary-text dark:text-primary-text-dark" : "text-muted-text-dark dark:text-muted-text"}`}
                    >
                        Payment
                    </p>
                </div>

                <span
                    className={`max-w-30 w-full h-0.5 inline-block mt-5.75 rounded-lg ${activeTab === "review" ? "bg-brand" : "bg-muted-text-dark dark:bg-muted-text"}`}
                ></span>

                <div className="flex flex-col items-center">
                    <div className="flex">
                        <span
                            className={`flex border-2  text-primary-text dark:text-primary-text-dark py-2.5 px-3.5 rounded-3xl ${activeTab === "review" ? "border-brand bg-brand" : "border-muted-text-dark dark:border-muted-text"}`}
                        >
                            <p
                                className={`flex items-center justify-center min-w-4.5 ${activeTab === "review" ? "text-white" : "text-muted-text-dark dark:text-muted-text"}`}
                            >
                                3
                            </p>
                        </span>
                    </div>
                    <p
                        className={` mt-2 ${activeTab === "review" ? "text-primary-text dark:text-primary-text-dark" : "text-muted-text-dark dark:text-muted-text"}`}
                    >
                        Review
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-8">
                <div className="min-[1000px]:col-span-2 text-primary-text dark:text-primary-text-dark">
                    {activeTab === "address" && (
                        <>
                            <AddressSection shippingAddress={shippingAddress} setShippingAddress={setShippingAddress} />
                            <div className="flex gap-4 mt-5">
                                <Link to={"/cart"} className="flex-1 edit-button flex items-center justify-center">
                                    Back
                                </Link>

                                <button
                                    disabled={shippingAddress === null}
                                    onClick={() => setActiveTab("payment")}
                                    className={`flex-1 px-3.5 py-2.5 rounded-lg transition-colors duration-300 ease ${shippingAddress === null ? "cursor-not-allowed bg-gray-300 dark:bg-gray-500 text-primary-text dark:text-primary-text-dark" : "cursor-pointer bg-brand hover:bg-brand-hover text-white"}`}
                                >
                                    Continue
                                </button>
                            </div>
                        </>
                    )}

                    {activeTab === "payment" && (
                        <>
                            <div className="flex flex-col gap-4 bg-header dark:bg-header-dark border border-border dark:border-border-dark rounded-lg p-6">
                                <h2 className="mb-2">Payment Method</h2>

                                <div className="flex items-center gap-4 px-4 py-6 border  rounded-lg bg-card dark:bg-card-dark border-border dark:border-border-dark">
                                    <button
                                        onClick={() => setPaymentMethod("card")}
                                        className="cursor-pointer p-1 h-fit hover:text-brand transition-colors duration-300 ease"
                                    >
                                        {paymentMethod === "card" ? (
                                            <SquareCheck size={20} className="text-brand" />
                                        ) : (
                                            <Square size={20} />
                                        )}
                                    </button>

                                    <div className="min-w-5 flex justify-center items-center">
                                        <i className="fa-solid fa-credit-card min-w-5"></i>
                                    </div>

                                    <div>
                                        <p>Credit Card</p>
                                        <p className="text-muted-text-dark dark:text-muted-text text-sm">
                                            Visa, Mastercard and more. Instant confirmation
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 px-4 py-6 border  rounded-lg bg-card dark:bg-card-dark border-border dark:border-border-dark">
                                    <button
                                        onClick={() => setPaymentMethod("paypal")}
                                        className="cursor-pointer p-1 h-fit hover:text-brand transition-colors duration-300 ease"
                                    >
                                        {paymentMethod === "paypal" ? (
                                            <SquareCheck size={20} className="text-brand" />
                                        ) : (
                                            <Square size={20} />
                                        )}
                                    </button>

                                    <div className="min-w-5 flex justify-center items-center">
                                        <i className="fa-brands fa-paypal text-lg"></i>
                                    </div>

                                    <div>
                                        <p>Paypal</p>
                                        <p className="text-muted-text-dark dark:text-muted-text text-sm">
                                            Pay with balance or card. Extra buyer protection
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 px-4 py-6 border  rounded-lg bg-card dark:bg-card-dark border-border dark:border-border-dark">
                                    <button
                                        onClick={() => setPaymentMethod("pix")}
                                        className="cursor-pointer p-1 h-fit hover:text-brand transition-colors duration-300 ease"
                                    >
                                        {paymentMethod === "pix" ? (
                                            <SquareCheck size={20} className="text-brand" />
                                        ) : (
                                            <Square size={20} />
                                        )}
                                    </button>

                                    <div className="min-w-5 flex justify-center items-center">
                                        <i className="fa-brands fa-pix text-lg min-w-5"></i>
                                    </div>

                                    <div>
                                        <p>Pix</p>
                                        <p className="text-muted-text-dark dark:text-muted-text text-sm">
                                            Instant payment. Approved in seconds
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 px-4 py-6 border  rounded-lg bg-card dark:bg-card-dark border-border dark:border-border-dark">
                                    <button
                                        onClick={() => setPaymentMethod("boleto")}
                                        className="cursor-pointer p-1 h-fit hover:text-brand transition-colors duration-300 ease"
                                    >
                                        {paymentMethod === "boleto" ? (
                                            <SquareCheck size={20} className="text-brand" />
                                        ) : (
                                            <Square size={20} />
                                        )}
                                    </button>

                                    <div className="min-w-5 flex justify-center items-center">
                                        <i className="fa-solid fa-barcode text-lg min-w-5"></i>
                                    </div>

                                    <div>
                                        <p>Boleto</p>
                                        <p className="text-muted-text-dark dark:text-muted-text text-sm">
                                            Print or copy code. Takes 1 to 3 business days
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 mt-5">
                                <button
                                    onClick={() => setActiveTab("address")}
                                    className="flex-1 edit-button flex items-center justify-center"
                                >
                                    Back
                                </button>

                                <button
                                    disabled={paymentMethod === null}
                                    onClick={() => setActiveTab("review")}
                                    className={`flex-1 px-3.5 py-2.5 rounded-lg transition-colors duration-300 ease ${paymentMethod === null ? "cursor-not-allowed bg-gray-300 dark:bg-gray-500 text-primary-text dark:text-primary-text-dark" : "cursor-pointer bg-brand hover:bg-brand-hover text-white"}`}
                                >
                                    Continue
                                </button>
                            </div>
                        </>
                    )}

                    {activeTab === "review" && (
                        <>
                            <div className="flex flex-col gap-4 bg-header dark:bg-header-dark border border-border dark:border-border-dark rounded-lg p-6 mb-6">
                                <h2 className="mb-2">Shipping Address</h2>

                                <div className="flex flex-col text-muted-text-dark dark:text-muted-text">
                                    <p>{`${shippingAddress.street}, ${shippingAddress.number}`}</p>
                                    {shippingAddress.complement && <p>{shippingAddress.complement}</p>}
                                    <p>{shippingAddress.neighborhood}</p>
                                    <p>{`${shippingAddress.city} - ${shippingAddress.state}`}</p>
                                    <p>{shippingAddress.zipCode}</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 bg-header dark:bg-header-dark border border-border dark:border-border-dark rounded-lg p-6 mb-6">
                                <h2 className="mb-2">Payment Method</h2>

                                <div className="flex gap-3 text-muted-text-dark dark:text-muted-text">
                                    {displayPayment[paymentMethod].icon}

                                    {displayPayment[paymentMethod].title}
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 bg-header dark:bg-header-dark border border-border dark:border-border-dark rounded-lg p-6">
                                <h2 className="mb-2">Order Items</h2>

                                {items.map((item) => (
                                    <div key={item.product.id} className="flex h-28 gap-5">
                                        <img
                                            src={item.product.image}
                                            alt=""
                                            className="w-30 h-full object-cover rounded-lg"
                                        />
                                        <div className="grid grid-cols-3 w-full max-[640px]:grid-cols-1">
                                            <div className="col-span-2 flex flex-col gap-2 max-[640px]:col-span-1">
                                                <p className="line-clamp-2">{item.product.name}</p>
                                                <p className="text-muted-text-dark dark:text-muted-text text-sm">
                                                    Quantity: {item.quantity}
                                                </p>
                                            </div>
                                            <p className="text-end max-[640px]:text-start">
                                                {formatMoney(item.product.price)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-4 mt-5">
                                <button
                                    onClick={() => setActiveTab("payment")}
                                    className="flex-1 edit-button flex items-center justify-center"
                                >
                                    Back
                                </button>

                                <button
                                    type="submit"
                                    disabled={createLoading}
                                    onClick={handlePurchase}
                                    className={`flex-1 relative overflow-hidden px-3.5 py-2.5 rounded-lg text-white transition-colors duration-300 ease cursor-pointer ${createLoading ? "bg-brand/95 cursor-not-allowed" : "bg-brand hover:bg-brand-hover"}`}
                                >
                                    {createLoading && (
                                        <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/35 to-transparent" />
                                    )}
                                    <span className="relative z-10">
                                        {createLoading ? "Processing..." : "Purchase"}
                                    </span>
                                </button>
                            </div>
                        </>
                    )}
                </div>

                <div className="flex flex-col gap-3 sticky top-10 h-fit p-5 bg-header dark:bg-header-dark border border-border dark:border-border-dark rounded-lg text-primary-text dark:text-primary-text-dark shadow-sm">
                    <p className="mb-4">Order Summary</p>
                    <div className="flex justify-between text-muted-text-dark dark:text-muted-text">
                        <p>
                            Subtotal ({itemCount} {itemCount == 1 ? "item" : "items"})
                        </p>
                        <p>{formatMoney(subTotal)}</p>
                    </div>
                    <div className="flex justify-between text-muted-text-dark dark:text-muted-text">
                        <p>Tax (10%)</p>
                        <p>{formatMoney(tax)}</p>
                    </div>
                    <div className="flex justify-between text-muted-text-dark dark:text-muted-text">
                        <p>Shipping</p>
                        <p>{formatMoney(shipping)}</p>
                    </div>
                    <hr className="text-muted-text-dark dark:text-muted-text my-2" />
                    <div className="flex justify-between">
                        <p>Total</p>
                        <p className="text-brand">{formatMoney(cartTotal)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
