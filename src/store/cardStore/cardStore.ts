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
    const newCard: Array<CardProduct> = [...this.cardProducts];

    const productIndex = newCard.findIndex(
      (cardProduct) => cardProduct.id === product.id
    );

    if (productIndex >= 0) {
      if (product.cardCount === 0) {
        newCard.splice(productIndex, 1);
      } else {
        newCard[productIndex] = product;
      }
    } else {
      newCard.push(product);
    }
    this.setCardProducts(newCard);
  };
}
