import { useContext } from "react";
import { StoreContext } from "src/store/rootStoreProvider";
import { RootStore } from "src/store/rootStore";

export function useRootStore(): RootStore {
  const context = useContext(StoreContext);

  if (context === undefined) {
    throw new Error("useRootStore must be used within StoreProvider");
  }
  return context;
}
