import { action, makeObservable, observable } from "mobx";
import { RootStore } from "../rootStore";

export default class ExchangeRateStore {
  root: RootStore;
  dollarExchangeRate: number = 0;

  constructor(root: RootStore) {
    this.root = root;
    makeObservable(this, {
      dollarExchangeRate: observable,
      getDollarExchangeRate: action,
    });
  }

  getDollarExchangeRate(): void {
    this.dollarExchangeRate = Number(
      (Math.random() * (80 - 60) + 60).toFixed(2)
    );
  }
}
