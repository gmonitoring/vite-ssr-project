import JSONServerClient from "src/plugins/axiosJSONService";

export type Product = {
  B: boolean; // -
  C: number; // price
  CV: null; // -
  G: number; // ?
  P: number; // count
  Pl: null; // -
  T: number; // product id
};

export type Products = {
  Error: string;
  Id: number;
  Success: boolean;
  Value: {
    Goods: Array<Product>;
  };
};

export const getProductsApi = async (): Promise<Products> => {
  return await JSONServerClient.get("products");
};
