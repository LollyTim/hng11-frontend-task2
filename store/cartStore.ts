// store/useStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import getProducts from "../actions";

interface Photo {
  url: string;
  // other properties of photo if any
}

interface Price {
  NGN: number;
  // other properties of price if any
}

interface Category {
  name: string;
  // other properties of category if any
}

interface Product {
  id: string; // id is a string
  name: string;
  price: string | number;
  description: string;
  photos?: Photo[];
  is_available: boolean;
  selling_price: string;
  current_price?: Price[];
  categories: Category[]; // Added categories field
}

interface CartProduct {
  id: string;
  name: string;
  current_price: number;
  photos: string;
  quantity: number;
  categories: Category[]; // Added categories field
}

interface State {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  cart: CartProduct[];
  addToCart: (product: CartProduct) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
}

const useStore = create<State>()(
  persist(
    (set, get) => ({
      products: [],
      loading: true,
      error: null,
      fetchProducts: async () => {
        set({ loading: true, error: null });
        const response = await getProducts();
        console.log(response);
        if (response.products) {
          console.log(response.products);
          set({ products: response.products, loading: false });
        } else {
          set({ error: response.message, loading: false });
        }
      },
      cart: [],
      addToCart: (product) => {
        set((state) => {
          const existingProduct = state.cart.find((p) => p.id === product.id);
          if (existingProduct) {
            return {
              cart: state.cart.map((p) =>
                p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
              ),
            };
          } else {
            const price =
              typeof product.current_price === "number"
                ? product.current_price
                : parseFloat(product.current_price);
            if (isNaN(price)) {
              console.error(
                `Invalid price for product: ${product.id}`,
                product
              );
              return state; // Don't add the product if the price is invalid
            }
            return {
              cart: [
                ...state.cart,
                { ...product, current_price: price, quantity: 1 },
              ],
            };
          }
        });
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

export default useStore;
