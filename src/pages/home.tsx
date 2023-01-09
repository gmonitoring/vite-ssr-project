import { FC } from "react";
import { observer } from "mobx-react";
import { RootStore } from "../store/rootStore";
import { Box, Container, Typography } from "@mui/material";
import { ProductContainer } from "../containers/products/ProductsContainer";
import { CardContainer } from "../containers/card/CardContainer";
import { useInitCard } from "../hooks/useInitCard";
import { useGetExchangeRateInInterval } from "../hooks/useGetExchangeRateInIterval";
import { useRootStore } from "../hooks/useRootStore";
import { getPriceColor } from "../utils/getPriceColor";

export async function prefetch(store: RootStore) {
  await Promise.all([
    store.productsStore?.getProducts(),
    store.namesStore?.getNames(),
  ]);
}

export const Home: FC = observer(() => {
  useInitCard();
  const { exchangeRateStore } = useRootStore();
  const exchangeRateState = useGetExchangeRateInInterval();

  return (
    <Container>
      <Box
        display="flex"
        width="fit-content"
        py={0.5}
        px={1}
        mb={2}
        borderRadius="8px"
        bgcolor={getPriceColor(exchangeRateState)}
      >
        <Typography>1$ = {exchangeRateStore.dollarExchangeRate}руб</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <ProductContainer exchangeRateState={exchangeRateState} />
        <CardContainer exchangeRateState={exchangeRateState} />
      </Box>
    </Container>
  );
});
