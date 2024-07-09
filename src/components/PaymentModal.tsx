'use client';

import { useState } from 'react';
import useModalStore from "../../store/modalStore";
import useCartStore from "../../store/cartStore";

export default function PaymentModal() {
  const clearCart = useCartStore((state) => state.clearCart);
  const closePaymentModal = useModalStore((state) => state.closePaymentModal);
  const openSuccessModal = useModalStore((state) => state.openSuccessModal);
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvvCode, setCvvCode] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  const totalAmount = useModalStore((state) => state.totalAmount);
  const vatAmount = totalAmount * 0.1;
  const totalWithVat = totalAmount + vatAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Payment details:', {
      email,
      cardNumber,
      expirationDate,
      cvvCode,
      deliveryAddress,
    });
    clearCart();
    closePaymentModal();
    openSuccessModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
      <div className="bg-[#F2F2F3] justify-center items-center p-8 xl:px-12 md:px-10 px-8 rounded-md xl:w-[608px] lg:w-[600px] md:w-[400px] w-[390px] h-[980px] max-w-full max-h-full flex flex-col overflow-x-hidden overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Payment</h2>
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col xl:justify-start justify-center xl:items-start w-full items-center ">
          <div className="flex flex-col w-full">
            <label htmlFor="email" className="font-OpenSans font-semibold">Email <span className='text-red-600'>*</span></label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-md p-2"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="cardHolderName" className="font-OpenSans font-semibold">Card Number <span className='text-red-600'>*</span></label>
            <input
              type="text"
              id="cardHolderName"
              placeholder='Enter card holder’s name'
              value={cardHolderName}
              onChange={(e) => setCardHolderName(e.target.value)}
              className="border rounded-md p-2"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="cardNumber" className="font-OpenSans font-semibold">Card Number <span className='text-red-600'>*</span></label>
            <input
              type="text"
              id="cardNumber"
              placeholder='0000 0000 0000 0000'
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="border rounded-md p-2 "

            />
          </div>
          <div className=" flex flex-row xl:gap-10 justify-between items-center gap-5 w-full">
            <div className="flex flex-col xl:w-full  w-[150px] ">
              <label htmlFor="expirationDate" className="font-OpenSans font-semibold sm:text-[14px]">Expiration Date <span className='text-red-600'>*</span></label>
              <input
                type="text"
                id="expirationDate"
                value={expirationDate}
                placeholder='14/04'
                onChange={(e) => setExpirationDate(e.target.value)}
                className="border rounded-md p-2 "

              />
            </div>
            <div className="flex flex-col xl:w-full w-[150px] ">
              <label htmlFor="cvvCode" className="font-OpenSans font-semibold">CVV Code <span className='text-red-600'>*</span></label>
              <input
                type="text"
                placeholder='***'
                id="cvvCode"
                value={cvvCode}
                onChange={(e) => setCvvCode(e.target.value)}
                className="border rounded-md p-2 "

              />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="deliveryAddress" className="font-OpenSans font-semibold">Delivery Address <span className='text-red-600'>*</span></label>
            <input
              type="text"
              id="deliveryAddress"
              placeholder='Enter Address'
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="border rounded-md p-2"

            />
          </div>
          <div className="flex justify-between flex-col w-full px-14">
            <div className="flex flex-row w-full justify-between gap-1 mb-2">
              <p className="text-gray-400 text-sm">Subtotal:</p>
              <p className="font-semibold text-black font-OpenSans">
                ${totalAmount.toFixed(2)}
              </p>
            </div>
            <div className="flex flex-row w-full justify-between gap-1 mb-2">
              <p className="text-gray-400 text-sm">VAT:</p>
              <p className="font-semibold text-black font-OpenSans">
                ${vatAmount.toFixed(2)}
              </p>
            </div>
            <div className="flex flex-row w-full justify-between gap-1 mb-2">
              <p className="text-gray-400 text-sm">Total:</p>
              <p className="font-semibold text-black font-OpenSans">
                ${totalWithVat.toFixed(2)}
              </p>
            </div>
            {/* <p className="font-OpenSans">Total: ${totalAmount.toFixed(2)}</p> */}
            {/* <p className="font-OpenSans"> ${vatAmount.toFixed(2)}</p> */}
            {/* <p className="font-OpenSans font-bold">Total </p> */}
          </div>
          <div className=" flex flex-row justify-center items-center w-full  ">

            <button type="submit" className="px-4 py-2 bg-black text-white rounded-md mt-4 mx-auto">
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}