import { RootStore } from "../rootStore";
import { plainToInstance } from "class-transformer";
import {mergeObservableDeep} from "./mergeObservableDeep";

export function rehydrate(): RootStore {
  const store = new RootStore();

  const state = plainToInstance(RootStore, (window as any).__STATE);

  delete (window as any).__STATE;

  const script = document.getElementById("__mobxState");

  script?.parentNode?.removeChild(script);

  if (state) mergeObservableDeep(store, state);

  return store;
}
