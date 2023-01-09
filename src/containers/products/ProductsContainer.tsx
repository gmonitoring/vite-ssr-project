import { FC } from "react";
import { observer } from "mobx-react";
import { Box, Typography } from "@mui/material";
import { ProductCard } from "../../components/productCard/ProductCard";
import { useRootStore } from "../../hooks/useRootStore";
import { useSetCardProducts } from "../../hooks/useSetCardProducts";
import { useGetCategoriesInInterval } from "../../hooks/useGetCategoriesInInterval";
import { ExchangeRateState } from "../../hooks/useGetExchangeRateInIterval";

export type ProductContainerProps = {
  exchangeRateState: ExchangeRateState;
};

export const ProductContainer: FC<ProductContainerProps> = observer(
  ({ exchangeRateState }) => {
    const { cardStore, exchangeRateStore } = useRootStore();
    const categories = useGetCategoriesInInterval();
    const setCardProduct = useSetCardProducts();

    return (
      <Box display="flex" flexDirection="column" width="100%">
        <Box mb={4}>
          <Typography variant="h3">Список товаров</Typography>
        </Box>
        <Box display="flex" flexDirection="column">
          {categories.map((category) => (
            <Box key={category.id}>
              {category?.products?.length > 0 && (
                <Box>
                  <Box mb={2}>
                    <Typography variant="h4">{category.name}</Typography>
                  </Box>
                  <Box display="flex" flexDirection="column">
                    {category.products.map((product) => (
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
                  </Box>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    );
  }
);
