import { getProductsApi, Products } from "../../api/products/products";
import { makeObservable, observable, action } from "mobx";
import { RootStore } from "../rootStore";

export default class ProductsStore {
  root: RootStore;
  products: Products = {
    Error: "",
    Id: 0,
    Success: false,
    Value: {
      Goods: [],
    },
  };
  isLoadingProducts = false;

  constructor(root: RootStore) {
    this.root = root;
    makeObservable(this, {
      products: observable,
      isLoadingProducts: observable,
      getProducts: action,
      setProducts: action,
      setIsLoadingProducts: action,
    });
  }

  async getProducts(): Promise<void> {
    this.setIsLoadingProducts(true);
    const products = await getProductsApi();
    this.setProducts(products);
    this.setIsLoadingProducts(false);
  }

  setIsLoadingProducts(state: boolean) {
    this.isLoadingProducts = state;
  }

  setProducts(products: Products) {
    this.products = products;
  }
}
