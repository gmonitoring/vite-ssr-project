import { FC, useEffect } from "react";
import { observer } from "mobx-react";
import { Box, Container, Typography } from "@mui/material";
import { RootStore } from "src/store/rootStore";
import { ProductContainer } from "src/containers/products/ProductsContainer";
import { CartContainer } from "src/containers/cart/CartContainer";
import { useRootStore } from "src/hooks/useRootStore";
import { getPriceColor } from "src/utils/getPriceColor";

export async function prefetch(store: RootStore) {
  store.exchangeRateStore.getDollarExchangeRate(); // Warning no async fn

  await Promise.all([
    store.productsStore?.getProducts(),
    store.namesStore?.getNames(),
  ]).then(() => {
    store.categoriesStore?.getCategories();
  });
}

export const Home: FC = observer(() => {
  const { cartStore, exchangeRateStore } = useRootStore();

  useEffect(() => {
    cartStore.initCart();
    exchangeRateStore.getDollarExchangeRateOnInterval();

    return () => {
      exchangeRateStore.dollarExchangeRateClearInterval();
    };
  }, []);

  return (
    <Container>
      <Box
        display="flex"
        width="fit-content"
        py={0.5}
        px={1}
        mb={2}
        borderRadius="8px"
        bgcolor={getPriceColor(exchangeRateStore.dollarExchangeRateDirection)}
      >
        <Typography>1$ = {exchangeRateStore.dollarExchangeRate}руб</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <ProductContainer
          exchangeRateState={exchangeRateStore.dollarExchangeRateDirection}
        />
        <CartContainer
          exchangeRateState={exchangeRateStore.dollarExchangeRateDirection}
        />
      </Box>
    </Container>
  );
});
