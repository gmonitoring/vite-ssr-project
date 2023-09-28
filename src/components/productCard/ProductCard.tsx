import { FC, memo } from "react";
import { observer } from "mobx-react";
import { Badge, Box, Button, Chip, Typography } from "@mui/material";
import { Counter } from "src/components/counter/Counter";
import { getPriceColor } from "src/utils/getPriceColor";
import { RateDirection } from "src/store/exchangeRateStore/exchangeRateStore";

export type Product = {
  id: number;
  name: string;
  price: number;
  count: number;
};

export type ProductCardProps = {
  product: Product;
  cartCount?: number;
  exchangeRate: number;
  exchangeRateState?: RateDirection;
  onHandleSetCard: (product: Product, count: number) => void;
};

export const ProductCard: FC<ProductCardProps> = memo(
  observer(
    ({
      product,
      cartCount = 0,
      exchangeRateState = "default",
      exchangeRate = 0,
      onHandleSetCard,
    }) => {
      const { name, price, count } = product;

      return (
        <Box
          display="flex"
          flexDirection="column"
          maxWidth="400px"
          p={2}
          border="1px solid #434343"
          borderRadius="20px"
        >
          <Box mb={2}>
            <Typography variant="subtitle1">{name}</Typography>
          </Box>
          <Box display="flex" flexDirection="column">
            <Box display="flex" alignItems="center">
              <Box mr={2}>
                {cartCount > 0 ? (
                  <Box display="flex" flexDirection="column">
                    <Box mb={1}>
                      <Counter
                        max={count}
                        value={cartCount}
                        onHandleChange={(count) =>
                          onHandleSetCard(product, count)
                        }
                      />
                    </Box>
                  </Box>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => onHandleSetCard(product, 1)}
                  >
                    В корзину
                  </Button>
                )}
              </Box>
              <Box
                py={0.5}
                px={1}
                borderRadius="8px"
                mr={2}
                bgcolor={getPriceColor(exchangeRateState)}
              >
                <Typography variant="caption">
                  {(exchangeRate * price).toFixed(2)} руб.
                </Typography>
              </Box>
              {count > 0 ? (
                <Box display="flex" mr={2}>
                  <Chip label="Осталось" />
                  <Badge color="secondary" badgeContent={count} max={10000} />
                </Box>
              ) : (
                <Typography variant="caption" color="error.main">
                  Нет в наличии
                </Typography>
              )}
            </Box>
            {count < cartCount && (
              <Typography variant="caption" color="error.main">
                Недостаточно товара в наличии
              </Typography>
            )}
          </Box>
        </Box>
      );
    }
  )
);
