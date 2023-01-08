import { useRootStore } from "./useRootStore";
import { Names } from "../api/names/names";

export type Product = {
  id: number;
  name: string;
  price: number;
  count: number;
};

export type Category = {
  id: number;
  name: string;
  products: Array<Product>;
};

export function useGetCategories(): () => Array<Category> {
  const { productsStore, namesStore } = useRootStore();

  const getCategoryProducts = (category: Names["B"]): Array<Product> => {
    const result: Array<Product> = [];
    productsStore.products.Value.Goods.forEach((product) => {
      if (category.B[String(product.T)]?.N) {
        result.push({
          id: product.T,
          name: category.B[String(product.T)].N,
          price: product.C,
          count: product.P,
        });
      }
    });
    return result;
  };

  return (): Array<Category> => {
    let newCategories: Array<Category> = [];

    if (productsStore.products.Success) {
      newCategories = Object.entries(namesStore.names).map(
        ([categoryId, category]) => ({
          id: Number(categoryId),
          name: category.G,
          products: getCategoryProducts(category),
        })
      );
    }

    return newCategories;
  };
}
