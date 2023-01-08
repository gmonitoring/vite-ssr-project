import { action, makeObservable, observable } from "mobx";
import { RootStore } from "../rootStore";

export default class ExchangeRateStore {
  root: RootStore;
  dollarExchangeRate: number | null = null;

  constructor(root: RootStore) {
    this.root = root;
    makeObservable(this, {
      dollarExchangeRate: observable,
      getDollarExchangeRate: action,
    });
  }

  getDollarExchangeRate(): void {
    this.dollarExchangeRate = Math.random() * (80 - 60) + 60;
  }
}
