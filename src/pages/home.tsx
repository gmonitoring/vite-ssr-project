import { FC } from "react";
import { observer } from "mobx-react";
import { RootStore } from "../store/rootStore";
import { Box, Container } from "@mui/material";
import { ProductContainer } from "../containers/products/ProductsContainer";
import { CardContainer } from "../containers/card/CardContainer";
import { useInitCard } from "../hooks/useInitCard";
import { useGetExchangeRateInInterval } from "../hooks/useGetExchangeRateInIterval";

export async function prefetch(store: RootStore) {
  await Promise.all([
    store.productsStore?.getProducts(),
    store.namesStore?.getNames(),
  ]);
}

export const Home: FC = observer(() => {
  useInitCard();
  const exchangeRateState = useGetExchangeRateInInterval();

  return (
    <Container>
      <Box display="flex" justifyContent="space-between">
        <ProductContainer exchangeRateState={exchangeRateState} />
        <CardContainer exchangeRateState={exchangeRateState} />
      </Box>
    </Container>
  );
});
