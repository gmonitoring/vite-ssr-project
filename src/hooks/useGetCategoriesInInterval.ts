import { useRootStore } from "./useRootStore";
import { useEffect, useState } from "react";
import { Category, useGetCategories } from "./useGetCategories";

export function useGetCategoriesInInterval(): Array<Category> {
  const { productsStore, namesStore } = useRootStore();
  const [categories, setCategories] = useState<Array<Category>>([]);
  const getCategories = useGetCategories();

  useEffect(() => {
    const newCategories = getCategories();

    setCategories(newCategories);

    const interval: NodeJS.Timer = setInterval(async () => {
      await Promise.all([productsStore?.getProducts(), namesStore?.getNames()])
        .then(() => {
          const newCategories = getCategories();

          setCategories(newCategories);
        })
        .catch((e) => {
          console.log(e);
        });
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return categories;
}
