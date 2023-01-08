import JSONServerClient from "../../plugins/axiosJSONService";

export type Products = {
  Error: string;
  Id: number;
  Success: boolean;
  Value: {
    Goods: Array<{
      B: boolean; // -
      C: number; // price
      CV: null; // -
      G: number; // ?
      P: number; // count
      Pl: null; // -
      T: number; // product id
    }>;
  };
};

export const getProductsApi = async (): Promise<Products> => {
  return await JSONServerClient.get("products");
};
