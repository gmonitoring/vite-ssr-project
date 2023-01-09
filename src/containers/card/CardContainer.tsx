import { FC } from "react";
import { observer } from "mobx-react";
import { Box, Button, Typography } from "@mui/material";
import { ProductCard } from "../../components/productCard/ProductCard";
import { useRootStore } from "../../hooks/useRootStore";
import { useSetCardProducts } from "../../hooks/useSetCardProducts";
import { ExchangeRateState } from "../../hooks/useGetExchangeRateInIterval";

export type CardContainerProps = {
  exchangeRateState: ExchangeRateState;
};

export const CardContainer: FC<CardContainerProps> = observer(
  ({ exchangeRateState }) => {
    const { cardStore, exchangeRateStore } = useRootStore();
    const setCardProduct = useSetCardProducts();

    return (
      <Box display="flex" flexDirection="column" width="100%">
        <Box mb={4}>
          <Typography variant="h3">Корзина</Typography>
        </Box>

        <Box display="flex" flexDirection="column">
          {cardStore.cardProducts.map((product) => (
            <Box key={product.id} mb={4}>
              <ProductCard
                cardCount={
                  cardStore.cardProducts.find(
                    (cardProduct) => cardProduct.id === product.id
                  )?.cardCount ?? 0
                }
                product={product}
                exchangeRate={exchangeRateStore.dollarExchangeRate}
                exchangeRateState={exchangeRateState}
                onHandleSetCard={setCardProduct}
              />
            </Box>
          ))}
          {cardStore.cardProducts.length > 0 && (
            <Box display="flex" flexDirection="column">
              <Box mb={2}>
                <Typography></Typography>
              </Box>
              <Box maxWidth="300px">
                <Button variant="contained" fullWidth size="large">
                  Купить
                </Button>
              </Box>
            </Box>
          )}
          {cardStore.cardProducts.length === 0 && (
            <Box p={6}>
              <Typography variant="h5" textAlign="center">
                Корзина пуста
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    );
  }
);
