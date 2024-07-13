import { create } from "zustand";
import useCartStore from "./cartStore"; // Import the cart store

interface ModalState {
  isPaymentModalOpen: boolean;
  isSuccessModalOpen: boolean;
  totalAmount: number;
  openPaymentModal: () => void;
  closePaymentModal: () => void;
  openSuccessModal: () => void;
  closeSuccessModal: () => void;
}

const useModalStore = create<ModalState>((set) => {
  const cart = useCartStore.getState().cart;
  const totalAmount = cart.reduce(
    (total, item) => total + item.current_price * item.quantity,
    0
  );

  return {
    isPaymentModalOpen: false,
    isSuccessModalOpen: false,
    totalAmount,
    openPaymentModal: () => set({ isPaymentModalOpen: true }),
    closePaymentModal: () => set({ isPaymentModalOpen: false }),
    openSuccessModal: () => set({ isSuccessModalOpen: true }),
    closeSuccessModal: () => set({ isSuccessModalOpen: false }),
  };
});

export default useModalStore;
