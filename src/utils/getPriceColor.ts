import { ExchangeRateState } from "../hooks/useGetExchangeRateInIterval";

export const getPriceColor = (
  exchangeRateState: ExchangeRateState = "default"
): string => {
  switch (exchangeRateState) {
    case "default":
      return "#cccccc";
    case "up":
      return "#EDA1A1";
    case "down":
      return "#B5EDA1";
  }
};
