import { FC } from "react";
import { Box, Button, Typography } from "@mui/material";

export type CounterProps = {
  value: number;
  max?: number;
  min?: number;
  step?: number;
  onHandleChange: (count: number) => void;
};

export const Counter: FC<CounterProps> = ({
  value,
  max = 10000,
  min = 0,
  step = 1,
  onHandleChange,
}) => {
  const onHandleIncrement = () => {
    if (value + step <= max) onHandleChange(value + step);
  };
  const onHandleDecrement = () => {
    if (value - step >= min) onHandleChange(value - step);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      p={1}
      border="1px solid #434343"
      borderRadius="8px"
    >
      <Box mr={1}>
        <Button onClick={onHandleDecrement}>-</Button>
      </Box>
      <Box display="flex" alignItems="center" mr={1}>
        <Typography>{value}</Typography>
      </Box>
      <Button onClick={onHandleIncrement}>+</Button>
    </Box>
  );
};
