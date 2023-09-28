import { makeObservable, observable, action } from "mobx";
import { RootStore } from "../rootStore";
import { Product } from "src/store/categoriesStore/categoriesStore";

export type CartProduct = Product & { cartCount: number };

export default class CartStore {
  root: RootStore;
  cartProducts: Array<CartProduct> = [];
  constructor(root: RootStore) {
    this.root = root;
    makeObservable(this, {
      cartProducts: observable,
      setCartProducts: action,
      setCartProduct: action,
      initCart: action,
    });
  }

  setCartProducts(products: Array<CartProduct>) {
    this.cartProducts = products;
    window.localStorage.setItem("cart", JSON.stringify(products));
  }

  setCartProduct = (product: CartProduct) => {
    const newCart: Array<CartProduct> = [...this.cartProducts];

    const productIndex = newCart.findIndex(
      (cartProduct) => cartProduct.id === product.id
    );

    if (productIndex >= 0) {
      if (product.cartCount === 0) {
        newCart.splice(productIndex, 1);
      } else {
        newCart[productIndex] = product;
      }
    } else {
      newCart.push(product);
    }
    this.setCartProducts(newCart);
  };

  initCart = () => {
    const stringCardJSON = localStorage.getItem("cart");
    const cartProducts: Array<CartProduct> = stringCardJSON
      ? JSON.parse(stringCardJSON)
      : [];
    if (cartProducts) this.setCartProducts(cartProducts);
  };
}
