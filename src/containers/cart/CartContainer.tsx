import { FC } from "react";
import { observer } from "mobx-react";
import { Box, Button, Typography } from "@mui/material";
import { ProductCard } from "src/components/productCard/ProductCard";
import { useRootStore } from "src/hooks/useRootStore";
import { RateDirection } from "src/store/exchangeRateStore/exchangeRateStore";
import { useCart } from "src/hooks/useCart";

export type CartContainerProps = {
  exchangeRateState: RateDirection;
};

export const CartContainer: FC<CartContainerProps> = observer(
  ({ exchangeRateState }) => {
    const { cartStore, exchangeRateStore } = useRootStore();
    const { setCartProduct, getCartProduct } = useCart();

    return (
      <Box display="flex" flexDirection="column" width="100%">
        <Box mb={4}>
          <Typography variant="h3">Корзина</Typography>
        </Box>

        <Box display="flex" flexDirection="column">
          {cartStore.cartProducts.map((product) => (
            <Box key={product.id} mb={4}>
              <ProductCard
                cartCount={getCartProduct(product.id)?.cartCount ?? 0}
                product={product}
                exchangeRate={exchangeRateStore.dollarExchangeRate}
                exchangeRateState={exchangeRateState}
                onHandleSetCard={setCartProduct}
              />
            </Box>
          ))}
          {cartStore.cartProducts.length > 0 && (
            <Box display="flex" flexDirection="column">
              <Box maxWidth="300px">
                <Button variant="contained" fullWidth size="large">
                  Купить
                </Button>
              </Box>
            </Box>
          )}
          {cartStore.cartProducts.length === 0 && (
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
