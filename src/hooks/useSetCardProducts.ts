import { useRootStore } from "./useRootStore";
import { CardProduct } from "../store/cardStore/cardStore";
import { Product } from "./useGetCategories";

export function useSetCardProducts(): (
  product: Product,
  count: number
) => void {
  const { cardStore } = useRootStore();

  return (product: Product, count: number): void => {
    const cardProduct: CardProduct = {
      ...product,
      cardCount: count,
    };

    cardStore.setCardProduct(cardProduct);
  };
}
