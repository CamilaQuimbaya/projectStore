/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Product {
  name: string;
  id: string | number;
  description: string;
  image: string;
  stock: number;
  price: number;
}

type State = {
  product: Product | null;
  errors: any;
};

type Actions = {
  setProduct: (product: Product) => void;
  clearProduct: () => void;
  updateProduct: (product: Partial<Product>) => void;
  setErrors: (errors: any) => void;
  clearErrors: () => void;
};

export const useProductStore = create(
  persist<State & Actions>(
    (set) => ({
      product: null,
      errors: null,
      setProduct: (product: Product) => set({ product }),
      clearProduct: () => set({ product: null }),
      updateProduct: (updatedFields: Partial<Product>) =>
        set((state) => ({
          product: state.product
            ? { ...state.product, ...updatedFields }
            : null,
        })),
      setErrors: (errors: any) => set({ errors }),
      clearErrors: () => set({ errors: null }),
    }),
    {
      name: "product",
    }
  )
);
