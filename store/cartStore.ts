import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void; // Corrected signature
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product) => {
        const existingProduct = get().cart.find((p) => p.id === product.id);
        if (existingProduct) {
          set((state) => ({
            cart: state.cart.map((p) =>
              p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
            ),
          }));
        } else {
          set((state) => ({
            cart: [...state.cart, { ...product, quantity: 1 }],
          }));
        }
      },
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),
      increaseQuantity: (productId) =>
        set((state) => ({
          cart: state.cart.map((p) =>
            p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
          ),
        })),
      decreaseQuantity: (productId) =>
        set((state) => {
          const updatedCart = state.cart.map((p) => {
            if (p.id === productId && p.quantity > 1) {
              return { ...p, quantity: p.quantity - 1 };
            }
            return p;
          });
          return { cart: updatedCart };
        }),
      clearCart: () =>
        set(() => ({
          cart: [],
        })),
    }),
    {
      name: "cart", // Name of the item in the localStorage
    }
  )
);

export default useCartStore;
