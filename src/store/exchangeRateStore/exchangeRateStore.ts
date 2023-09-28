import { action, makeObservable, observable } from "mobx";
import { RootStore } from "src/store/rootStore";

export type RateDirection = "up" | "down" | "default";

export default class ExchangeRateStore {
  root: RootStore;
  dollarExchangeRate: number = 0;
  dollarExchangeRateDirection: RateDirection = "default";
  dollarExchangeRateInterval: NodeJS.Timeout | null = null;

  constructor(root: RootStore) {
    this.root = root;
    makeObservable(this, {
      dollarExchangeRate: observable,
      dollarExchangeRateDirection: observable,
      dollarExchangeRateInterval: observable,
      getDollarExchangeRate: action,
      setRateDirection: action,
      getDollarExchangeRateOnInterval: action,
      dollarExchangeRateClearInterval: action,
    });
  }

  getDollarExchangeRate(): void {
    this.dollarExchangeRate = Number(
      (Math.random() * (80 - 60) + 60).toFixed(2)
    );
  }

  setRateDirection(payload: RateDirection): void {
    this.dollarExchangeRateDirection = payload;
  }

  getDollarExchangeRateOnInterval(interval: number = 20000): void {
    let lastDollarExchangeRate: number = this.dollarExchangeRate;

    this.dollarExchangeRateInterval = setInterval(() => {
      if (this.dollarExchangeRate && lastDollarExchangeRate) {
        if (lastDollarExchangeRate > this.dollarExchangeRate) {
          this.setRateDirection("down");
        }
        if (lastDollarExchangeRate < this.dollarExchangeRate) {
          this.setRateDirection("up");
        }
        if (lastDollarExchangeRate === this.dollarExchangeRate) {
          this.setRateDirection("default");
        }
      }
      lastDollarExchangeRate = this.dollarExchangeRate;
      this.getDollarExchangeRate();
    }, interval);
  }

  dollarExchangeRateClearInterval(): void {
    if (this.dollarExchangeRateInterval) {
      clearInterval(this.dollarExchangeRateInterval);
    }
  }
}
