import { useState, useEffect } from "react";
import React from "react";
import { MapPin, Pencil, Trash2, Square, SquareCheck } from "lucide-react";
import { getAddresses, createAddress, updateAddress, deleteAddress } from "../api/userService";
import { toast } from "react-toastify";
import AddressLoading from "./skeleton/AddressLoading";

const AddressSection = ({ shippingAddress, setShippingAddress }) => {
    const [addresses, setAddresses] = useState([]);
    const [addressAction, setAddressAction] = useState("");
    const [submitLoading, setSubmitLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [addressId, setAddressId] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 500);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 500);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const fetchAddresses = async () => {
        try {
            const res = await getAddresses();
            setAddresses(res.data.data);
        } catch {
            setAddresses([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const load = async () => {
            await fetchAddresses();
        };
        load();
    }, []);

    const [form, setForm] = useState({
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);

        try {
            if (addressAction === "edit") await updateAddress(addressId, form);
            else await createAddress(form);

            setAddressAction("");

            setForm({
                street: "",
                number: "",
                complement: "",
                neighborhood: "",
                city: "",
                state: "",
                zipCode: "",
                country: "",
            });

            fetchAddresses();
            toast.success(addressAction === "edit" ? "Address edited successfully" : "Address added successfully");
        } catch (err) {
            toast.error(
                err.response?.data?.message || addressAction === "edit"
                    ? "Error editing address"
                    : "Error adding address",
            );
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteAddress(id);
            fetchAddresses();
            toast.success("Address deleted successfully");
        } catch (err) {
            toast.error(err.response?.data?.message || "Error deleting address");
        }
    };

    return (
        <div className="flex flex-col gap-5 w-full p-6 rounded-lg border border-border dark:border-border-dark bg-header dark:bg-header-dark text-primary-text dark:text-primary-text-dark">
            {loading ? (
                <AddressLoading />
            ) : (
                <>
                    <div className="flex items-center justify-between">
                        {addressAction === "add" || addressAction === "edit" ? (
                            <>
                                <p>{addressAction === "add" ? "Add Address" : "Edit Address"}</p>
                                <button
                                    onClick={() => {
                                        setAddressAction("");
                                        setForm({
                                            street: "",
                                            number: "",
                                            complement: "",
                                            neighborhood: "",
                                            city: "",
                                            state: "",
                                            zipCode: "",
                                            country: "",
                                        });
                                    }}
                                    className="cancel-button"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <p>{setShippingAddress ? "Shipping Information" : "Saved Addresses"}</p>
                                <button onClick={() => setAddressAction("add")} className="edit-button">
                                    Add
                                </button>
                            </>
                        )}
                    </div>

                    {addressAction === "add" || addressAction === "edit" ? (
                        <div>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <div className="flex gap-3 max-[500px]:flex-col">
                                    <div className="flex-1">
                                        <label
                                            htmlFor="street"
                                            className="font-semibold text-muted-text-dark dark:text-muted-text max-[500px]:hidden"
                                        >
                                            Street
                                        </label>
                                        <input
                                            id="street"
                                            className="input input-autofill mt-2"
                                            name="street"
                                            value={form.street}
                                            onChange={handleChange}
                                            placeholder={isMobile ? "Street" : ""}
                                            required
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label
                                            htmlFor="number"
                                            className="font-semibold text-muted-text-dark dark:text-muted-text max-[500px]:hidden"
                                        >
                                            Number
                                        </label>
                                        <input
                                            id="number"
                                            className="input input-autofill mt-2"
                                            name="number"
                                            value={form.number}
                                            onChange={handleChange}
                                            placeholder={isMobile ? "Number" : ""}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-3 max-[500px]:flex-col">
                                    <div className="flex-1">
                                        <label
                                            htmlFor="complement"
                                            className="font-semibold text-muted-text-dark dark:text-muted-text max-[500px]:hidden"
                                        >
                                            Complement
                                        </label>
                                        <input
                                            id="complement"
                                            className="input input-autofill mt-2"
                                            name="complement"
                                            value={form.complement}
                                            onChange={handleChange}
                                            placeholder={isMobile ? "Complement" : ""}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label
                                            htmlFor="neighborhood"
                                            className="font-semibold text-muted-text-dark dark:text-muted-text max-[500px]:hidden"
                                        >
                                            Neighborhood
                                        </label>
                                        <input
                                            id="neighborhood"
                                            className="input input-autofill mt-2"
                                            name="neighborhood"
                                            value={form.neighborhood}
                                            onChange={handleChange}
                                            placeholder={isMobile ? "Neighborhood" : ""}
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-3 max-[500px]:flex-col">
                                    <div className="flex-1">
                                        <label
                                            htmlFor="city"
                                            className="font-semibold text-muted-text-dark dark:text-muted-text max-[500px]:hidden"
                                        >
                                            City
                                        </label>
                                        <input
                                            id="city"
                                            className="input input-autofill mt-2"
                                            name="city"
                                            value={form.city}
                                            onChange={handleChange}
                                            placeholder={isMobile ? "City" : ""}
                                            required
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label
                                            htmlFor="state"
                                            className="font-semibold text-muted-text-dark dark:text-muted-text max-[500px]:hidden"
                                        >
                                            State
                                        </label>
                                        <input
                                            id="state"
                                            className="input input-autofill mt-2"
                                            name="state"
                                            value={form.state}
                                            onChange={handleChange}
                                            placeholder={isMobile ? "State" : ""}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-3 max-[500px]:flex-col">
                                    <div className="flex-1">
                                        <label
                                            htmlFor="zipCode"
                                            className="font-semibold text-muted-text-dark dark:text-muted-text max-[500px]:hidden"
                                        >
                                            Zip Code
                                        </label>
                                        <input
                                            id="zipCode"
                                            className="input input-autofill mt-2"
                                            name="zipCode"
                                            value={form.zipCode}
                                            onChange={handleChange}
                                            placeholder={isMobile ? "Zip Code" : ""}
                                            required
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label
                                            htmlFor="country"
                                            className="font-semibold text-muted-text-dark dark:text-muted-text max-[500px]:hidden"
                                        >
                                            Country
                                        </label>
                                        <input
                                            id="country"
                                            className="input input-autofill mt-2"
                                            name="country"
                                            value={form.country}
                                            onChange={handleChange}
                                            autoComplete="country"
                                            placeholder={isMobile ? "Country" : ""}
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitLoading}
                                    className={`flex-1 relative overflow-hidden py-2 rounded-lg mt-4 text-white transition-colors duration-300 ease cursor-pointer ${submitLoading ? "bg-brand/95 cursor-not-allowed" : "bg-brand hover:bg-brand-hover"}`}
                                >
                                    {submitLoading && (
                                        <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/35 to-transparent" />
                                    )}
                                    <span className="relative z-10">
                                        {submitLoading
                                            ? "Saving..."
                                            : addressAction === "add"
                                              ? "Add Address"
                                              : "Edit Address"}
                                    </span>
                                </button>
                            </form>
                        </div>
                    ) : addresses.length === 0 ? (
                        <div className="flex flex-col gap-6 items-center my-4 text-muted-text-dark dark:text-muted-text">
                            <MapPin size={45} />
                            <p className="text-center">No saved addresses yet. Add one to make checkout faster!</p>
                        </div>
                    ) : (
                        addresses.map((address) => (
                            <div key={address.id} className="flex flex-col gap-2">
                                <div className="flex gap-3.5 text-muted-text-dark dark:text-muted-text border-border dark:border-border-dark rounded-lg p-4 bg-card dark:bg-card-dark">
                                    {setShippingAddress ? (
                                        <button
                                            onClick={() => setShippingAddress(address)}
                                            className="cursor-pointer p-1 h-fit hover:text-brand transition-colors duration-300 ease"
                                        >
                                            {shippingAddress?.id === address.id ? (
                                                <SquareCheck size={20} className="text-brand" />
                                            ) : (
                                                <Square size={20} />
                                            )}
                                        </button>
                                    ) : (
                                        <MapPin size={18} className="mt-0.5" />
                                    )}

                                    <div className="flex flex-col w-full">
                                        <div className="flex justify-between text-base w-full min-h-7">
                                            <p className="text-primary-text dark:text-primary-text-dark">{`${address.street}, ${address.number}`}</p>

                                            <div className="flex gap-5 max-[550px]:hidden">
                                                <button
                                                    onClick={() => {
                                                        setAddressAction("edit");
                                                        setForm({
                                                            street: address.street || "",
                                                            number: address.number || "",
                                                            complement: address.complement || "",
                                                            neighborhood: address.neighborhood || "",
                                                            city: address.city || "",
                                                            state: address.state || "",
                                                            zipCode: address.zipCode || "",
                                                            country: address.country || "",
                                                        });
                                                        setAddressId(address.id);
                                                    }}
                                                    className="cursor-pointer p-1 hover:text-brand transition-colors duration-300 ease"
                                                >
                                                    <Pencil size={17} />
                                                </button>

                                                {!setShippingAddress && (
                                                    <button
                                                        onClick={() => handleDelete(address.id)}
                                                        className="cursor-pointer p-1 hover:text-red-500 transition-colors duration-300 ease"
                                                    >
                                                        <Trash2 size={17} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {address.complement && <p>{address.complement}</p>}
                                        <p>{address.neighborhood}</p>
                                        <p>{`${address.city} - ${address.state}`}</p>
                                        <p>{address.zipCode}</p>
                                    </div>
                                </div>

                                <div className="flex gap-2 text-primary-text dark:text-primary-text-dark min-[550px]:hidden">
                                    <button
                                        onClick={() => {
                                            setAddressAction("edit");
                                            setForm({
                                                street: address.street || "",
                                                number: address.number || "",
                                                complement: address.complement || "",
                                                neighborhood: address.neighborhood || "",
                                                city: address.city || "",
                                                state: address.state || "",
                                                zipCode: address.zipCode || "",
                                                country: address.country || "",
                                            });
                                            setAddressId(address.id);
                                        }}
                                        className="flex-1 flex items-center justify-center bg-card dark:bg-card-dark text-brand py-1.5 px-2 rounded-lg cursor-pointer hover:bg-edit-hover hover:dark:bg-edit-hover-dark transition-colors duration-300 ease"
                                    >
                                        <Pencil size={14} className="mr-2" />
                                        Edit
                                    </button>
                                    {!setShippingAddress && (
                                        <button
                                            onClick={() => handleDelete(address.id)}
                                            className="flex-1 flex items-center justify-center bg-card dark:bg-card-dark text-red-500 py-1.5 px-2 rounded-lg cursor-pointer hover:bg-edit-hover hover:dark:bg-edit-hover-dark transition-colors duration-300 ease"
                                        >
                                            <Trash2 size={14} className="mr-2" />
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </>
            )}
        </div>
    );
};

export default AddressSection;
