import { useRootStore } from "./useRootStore";
import { useEffect, useState } from "react";

export type ExchangeRateState = "up" | "down" | "default";

export function useGetExchangeRateInInterval(): ExchangeRateState {
  const { exchangeRateStore } = useRootStore();
  const [dollarExchangeRateState, setDollarRateState] =
    useState<ExchangeRateState>("default");

  useEffect(() => {
    exchangeRateStore.getDollarExchangeRate();
    let lastDollarExchangeRate: number | null =
      exchangeRateStore.dollarExchangeRate;

    const interval: NodeJS.Timer = setInterval(async () => {
      exchangeRateStore.getDollarExchangeRate();

      if (exchangeRateStore.dollarExchangeRate && lastDollarExchangeRate) {
        if (lastDollarExchangeRate > exchangeRateStore.dollarExchangeRate)
          setDollarRateState("up");
        if (lastDollarExchangeRate < exchangeRateStore.dollarExchangeRate)
          setDollarRateState("down");
      }

      lastDollarExchangeRate = exchangeRateStore.dollarExchangeRate;
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  return dollarExchangeRateState;
}
