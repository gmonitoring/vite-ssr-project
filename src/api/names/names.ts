import JSONServerClient from "src/plugins/axiosJSONService";

export type Names = {
  [key: string]: {
    G: string;
    C: number;
    B: {
      [key: string]: {
        N: string;
        T: number;
      };
    };
  };
};

export const getNamesApi = async (): Promise<Names> => {
  return await JSONServerClient.get("names");
};
