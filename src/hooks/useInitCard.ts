import { useRootStore } from "./useRootStore";
import { useEffect } from "react";
import { CardProduct } from "../store/cardStore/cardStore";

export function useInitCard(): void {
  const { cardStore } = useRootStore();

  useEffect(() => {
    const stringCardJSON = localStorage.getItem("card");
    const cardProducts: Array<CardProduct> = stringCardJSON
      ? JSON.parse(stringCardJSON)
      : [];
    if (cardProducts) cardStore.setCardProducts(cardProducts);
  }, []);
}
