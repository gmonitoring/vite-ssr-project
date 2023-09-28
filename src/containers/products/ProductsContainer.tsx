import { FC, useEffect } from "react";
import { observer } from "mobx-react";
import { Box, Typography } from "@mui/material";
import { ProductCard } from "src/components/productCard/ProductCard";
import { useRootStore } from "src/hooks/useRootStore";
import { RateDirection } from "src/store/exchangeRateStore/exchangeRateStore";
import { useCart } from "src/hooks/useCart";

export type ProductContainerProps = {
  exchangeRateState: RateDirection;
};

export const ProductContainer: FC<ProductContainerProps> = observer(
  ({ exchangeRateState }) => {
    const { exchangeRateStore, categoriesStore, productsStore, namesStore } =
      useRootStore();
    const { setCartProduct, getCartProduct } = useCart();

    useEffect(() => {
      const interval: NodeJS.Timeout = setInterval(async () => {
        await Promise.all([productsStore.getProducts(), namesStore.getNames()])
          .then(() => {
            categoriesStore.getCategories();
          })
          .catch((e) => {
            console.log(e);
          });
      }, 15000);

      return () => clearInterval(interval);
    }, []);

    return (
      <Box display="flex" flexDirection="column" width="100%">
        <Box mb={4}>
          <Typography variant="h3">Список товаров</Typography>
        </Box>
        {categoriesStore.categories.length > 0 && (
          <Box display="flex" flexDirection="column">
            {categoriesStore.categories.map((category) => (
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
                            cartCount={
                              getCartProduct(product.id)?.cartCount ?? 0
                            }
                            product={product}
                            exchangeRate={exchangeRateStore.dollarExchangeRate}
                            exchangeRateState={exchangeRateState}
                            onHandleSetCard={setCartProduct}
                          />
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    );
  }
);
