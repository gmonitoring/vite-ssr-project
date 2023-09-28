import { configure } from "mobx";
import ProductsStore from "src/store/productsStore/productsStore";
import NamesStore from "src/store/namesStore/namesStore";
import ExchangeRateStore from "src/store/exchangeRateStore/exchangeRateStore";
import CardStore from "src/store/cartStore/cartStore";
import CategoriesStore from "src/store/categoriesStore/categoriesStore";

configure({ enforceActions: "observed" });

export class RootStore {
  exchangeRateStore: ExchangeRateStore;
  productsStore: ProductsStore;
  namesStore: NamesStore;
  cartStore: CardStore;
  categoriesStore: CategoriesStore;

  constructor() {
    this.exchangeRateStore = new ExchangeRateStore(this);
    this.productsStore = new ProductsStore(this);
    this.namesStore = new NamesStore(this);
    this.cartStore = new CardStore(this);
    this.categoriesStore = new CategoriesStore(this);
  }
}
