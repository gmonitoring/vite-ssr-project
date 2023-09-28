import { useRootStore } from "./useRootStore";
import { CartProduct } from "../store/cartStore/cartStore";
import { Product } from "src/store/categoriesStore/categoriesStore";

export type CartFunctions = {
  setCartProduct: (product: Product, count: number) => void;
  getCartProduct: (id: number) => CartProduct | null;
};

export function useCart(): CartFunctions {
  const { cartStore } = useRootStore();

  const setCartProduct = (product: Product, count: number): void => {
    const cartProduct: CartProduct = {
      ...product,
      cartCount: count,
    };

    cartStore.setCartProduct(cartProduct);
  };

  const getCartProduct = (id: number): CartProduct | null => {
    return (
      cartStore.cartProducts.find((cartProduct) => cartProduct.id === id) ??
      null
    );
  };

  return {
    setCartProduct,
    getCartProduct,
  };
}
