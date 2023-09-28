import { makeObservable, observable, action } from "mobx";
import { RootStore } from "src/store/rootStore";
import { Names } from "src/api/names/names";

export type Product = {
  id: number;
  name: string;
  price: number;
  count: number;
};

export type Category = {
  id: number;
  name: string;
  products: Array<Product>;
};

export default class CategoriesStore {
  root: RootStore;
  categories: Array<Category> = [];
  constructor(root: RootStore) {
    this.root = root;
    makeObservable(this, {
      categories: observable,
      getProductsByCategory: action,
      getCategories: action,
    });
  }

  getProductsByCategory(category: Names["B"]) {
    const result: Array<Product> = [];
    this.root.productsStore.products.Value.Goods.forEach((product) => {
      if (category.B[String(product.T)]?.N) {
        result.push({
          id: product.T,
          name: category.B[String(product.T)].N,
          price: product.C,
          count: product.P,
        });
      }
    });
    return result;
  }

  getCategories() {
    let newCategories: Array<Category> = [];

    if (this.root.productsStore.products.Success) {
      newCategories = Object.entries(this.root.namesStore.names).map(
        ([categoryId, category]) => ({
          id: Number(categoryId),
          name: category.G,
          products: this.getProductsByCategory(category),
        })
      );
    }
    if (newCategories.length) this.categories = newCategories;
  }
}
