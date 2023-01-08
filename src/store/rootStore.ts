import { configure } from "mobx";
import ProductsStore from "./productsStore/productsStore";
import NamesStore from "./namesStore/namesStore";
import ExchangeRateStore from "./exchangeRateStore/exchangeRateStore";
import CardStore from "./cardStore/cardStore";

configure({ enforceActions: "observed" });

export class RootStore {
  exchangeRateStore: ExchangeRateStore;
  productsStore: ProductsStore;
  namesStore: NamesStore;
  cardStore: CardStore;

  constructor() {
    this.exchangeRateStore = new ExchangeRateStore(this);
    this.productsStore = new ProductsStore(this);
    this.namesStore = new NamesStore(this);
    this.cardStore = new CardStore(this);
  }
}
