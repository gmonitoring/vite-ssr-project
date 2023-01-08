import { RootStore } from "../rootStore";
import { makeObservable, observable, action } from "mobx";
import { Product } from "../../hooks/useGetCategories";

export type CardProduct = Product & { cardCount: number };

export default class CardStore {
  root: RootStore;
  cardProducts: Array<CardProduct> = [];
  constructor(root: RootStore) {
    this.root = root;
    makeObservable(this, {
      cardProducts: observable,
      setCardProducts: action,
      setCardProduct: action,
    });
  }

  setCardProducts(products: Array<CardProduct>) {
    this.cardProducts = products;
    window.localStorage.setItem("card", JSON.stringify(products));
  }

  setCardProduct = (product: CardProduct) => {
    const newCard: Array<CardProduct> = [
      ...this.cardProducts.filter(
        (cardProduct) => cardProduct.id !== product.id
      ),
    ];
    if (product.cardCount > 0 && product.count > 0) newCard.push(product);

    this.setCardProducts(newCard);
  };
}
