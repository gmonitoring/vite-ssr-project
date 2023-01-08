import { createContext, FC, PropsWithChildren } from "react";
import { RootStore } from "./rootStore";

export const StoreContext = createContext<RootStore | undefined>(undefined);

type RootStoreProviderProps = {
  store: RootStore;
} & PropsWithChildren;

export const RootStoreProvider: FC<RootStoreProviderProps> = ({
  children,
  store,
}) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
