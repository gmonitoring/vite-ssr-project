import JSONServerClient from "../../plugins/axiosJSONService";

export type Names = {
  [key: string]: {
    // category id
    G: string; // category name
    C: number;
    B: {
      // category products
      [key: string]: {
        // product id
        N: string; // product name
        T: number; // product HZ ?
      };
    };
  };
};

export const getNamesApi = async (): Promise<Names> => {
  return await JSONServerClient.get("names");
};
