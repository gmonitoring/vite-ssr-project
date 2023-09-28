import { RateDirection } from "src/store/exchangeRateStore/exchangeRateStore";

export const getPriceColor = (exchangeRateState: RateDirection): string => {
  switch (exchangeRateState) {
    case "default":
      return "#cccccc";
    case "up":
      return "#EDA1A1";
    case "down":
      return "#B5EDA1";
  }
};
