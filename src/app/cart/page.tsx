
"use client";

import Image from "next/image";
import { useEffect } from "react";
import Link from "next/link";

import backIcon from "../../../images/icons/blackCartIcon.svg"
import successIcon from "../../../images/icons/ri_verified-badge-line.svg";
import PaymentModal from "../../components/PaymentModal";
import useModalStore from "../../../store/modalStore";
import useStore from "../../../store/cartStore";

const Cart: React.FC = () => {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity, loading } = useStore((state) => ({
        cart: state.cart,
        loading: state.loading,
        removeFromCart: state.removeFromCart,
        increaseQuantity: state.increaseQuantity,
        decreaseQuantity: state.decreaseQuantity,
    }));

    const openPaymentModal = useModalStore((state) => state.openPaymentModal);
    const closeSuccessModal = useModalStore((state) => state.closeSuccessModal);
    const isPaymentModalOpen = useModalStore((state) => state.isPaymentModalOpen);
    const isSuccessModalOpen = useModalStore((state) => state.isSuccessModalOpen);

    const getItemPrice = (price: number) => {
        return price || 0;
    };

    const cartTotal = cart.reduce((total, item) => {
        const price = getItemPrice(item.current_price);
        return total + price * item.quantity;
    }, 0);

    const formatPrice = (price: number) => {
        return isNaN(price) ? "0.00" : price.toFixed(2);
    };

    useEffect(() => {
        if (isSuccessModalOpen) {
            const timer = setTimeout(() => {
                closeSuccessModal();
                window.location.href = "/";
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [isSuccessModalOpen, closeSuccessModal]);


    if (loading) {
        return (
            <main className="flex w-[90%] flex-col justify-start items-start mx-auto my-20">
                <div className="w-full flex flex-col justify-start items-start mt-6">
                    <p className="flex xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl font-OpenSans font-semibold">
                        Shopping Cart
                    </p>
                    {[...Array(3)].map((_, index) => (
                        <div
                            className="w-[100%] flex xl:flex-row flex-col md:flex-row xl:justify xl:items-end md:items-end sm:items-start xl:gap-6 border rounded-xl px-12 py-5 mt-4 animate-pulse"
                            key={index}
                        >
                            <div className="flex xl:flex-row md:flex-row flex-col gap-4 justify-center items-center relative">
                                <div className="w-[249px] h-[235px] rounded-lg bg-gray-300"></div>
                                <div className="flex flex-col gap-2 py-5">
                                    <div className="h-[28px] w-[250px] bg-gray-300 rounded-lg"></div>
                                    <div className="h-[20px] w-[200px] bg-gray-300 rounded-lg"></div>
                                    <div className="h-[20px] w-[150px] bg-gray-300 rounded-lg"></div>
                                    <div className="h-[20px] w-[100px] bg-gray-300 rounded-lg"></div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 ml-6 mb-2">
                                <div className="h-[20px] w-[100px] bg-gray-300 rounded-lg"></div>
                                <div className="h-[20px] w-[150px] bg-gray-300 rounded-lg"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        );
    }

    return (
        <main className="flex w-[90%] flex-col justify-start items-start mx-auto my-20">
            <Link href="/" className="flex flex-row gap-1">
                <Image src={backIcon} alt="backIcon" />
                <p>Return to store</p>
            </Link>

            <div className="w-full flex flex-col justify-start items-start mt-6">
                <p className="flex xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl font-OpenSans font-semibold">
                    Shopping Cart
                </p>
                {cart.map((item) => (
                    <div
                        className="w-[100%] flex xl:flex-row flex-col md:flex-row xl:justify xl:items-end md:items-end sm:items-start xl:gap-6 border rounded-xl px-12 py-5 mt-4"
                        key={item.id}
                    >
                        <div className="flex xl:flex-row md:flex-row flex-col gap-4 justify-center items-center relative">
                            <Image
                                src={`https://api.timbu.cloud/images/${item.photos}`}
                                alt=""
                                unoptimized
                                width={250}
                                height={234}
                                className="w-[249px] h-[235px] rounded-lg"
                            />

                            <button
                                className="absolute top-2 left-2 bg-white rounded-full px-2 py-1 text-black font-OpenSans text-[12px]"
                                onClick={() => removeFromCart(item.id)}
                            >
                                X
                            </button>
                            <div className="flex flex-col gap-2 py-5">
                                <h1 className="xl:text-[28px] text-[20px] font-bold font-OpenSans">
                                    {item.name}
                                </h1>
                                <p className="text-base font-OpenSans font-semibold">
                                    Eligible for free shipping
                                </p>
                                <p className="font-OpenSans text-gray-400">
                                    Price:{" "}
                                    <span className="font-semibold text-black">
                                        ${formatPrice(getItemPrice(item.current_price))}
                                    </span>
                                </p>

                                <div className="flex flex-row gap-1">
                                    <button
                                        className="py-1 px-3 rounded-full justify-center items-center flex bg-black text-white"
                                        onClick={() => decreaseQuantity(item.id)}
                                    >
                                        -
                                    </button>
                                    <div className="py-1 px-3 rounded-full justify-center items-center flex bg-black text-white">
                                        <p> {item.quantity}</p>
                                    </div>

                                    <button
                                        className="py-1 px-3 rounded-full justify-center items-center flex bg-black text-white"
                                        onClick={() => increaseQuantity(item.id)}
                                    >
                                        +
                                    </button>
                                </div>

                                <p className="text-gray-400 text-sm">
                                    Total: $
                                    {formatPrice(getItemPrice(item.current_price) * item.quantity)}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 ml-6 mb-2">
                            <p className="text-gray-400 text-sm">Subtotal</p>
                            <p className="font-semibold text-black font-OpenSans">
                                ${formatPrice(getItemPrice(item.current_price) * item.quantity)}
                            </p>
                        </div>
                    </div>
                ))}

                <div className="w-[100%] flex xl:flex-row flex-col md:flex-row xl:justify xl:items-end md:items-end sm:items-start xl:gap-6 border rounded-xl px-12 py-5 mt-4">
                    <div className="flex flex-col gap-2 max-w-[362px]">
                        <div className="flex flex-row justify-between px-2 items-center">
                            <p className="font-OpenSans">Subtotal</p>
                            <p className="font-bold text-black font-OpenSans">
                                ${formatPrice(cartTotal)}
                            </p>
                        </div>
                        <div className="flex flex-row justify-between px-2 items-center mb-3">
                            <p className="font-OpenSans">Delivery</p>
                            <p className="font-bold text-black font-OpenSans">$0.00</p>
                        </div>
                        <div className="border-t w-full border-black"></div>

                        <div className="flex flex-row justify-between px-2 items-center">
                            <p className="font-OpenSans">Total</p>
                            <p className="font-bold text-black font-OpenSans">
                                ${formatPrice(cartTotal)}
                            </p>
                        </div>
                        <button
                            className="w-full font-OpenSans text-xl px-6 py-3 flex justify-center items-center text-white rounded-lg bg-black"
                            onClick={openPaymentModal}
                        >
                            Pay ${formatPrice(cartTotal)}
                        </button>
                    </div>
                </div>
            </div>

            {isPaymentModalOpen && <PaymentModal />}


            {/* Success Modal */}
            {isSuccessModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white  p-8 rounded-md flex flex-col justify-center items-center w-[500px]">
                        <Image src={successIcon} alt="" />
                        <h2 className="text-2xl font-bold mb-4">Payment Successful</h2>
                        <p>You are being redirected to store</p>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Cart;
