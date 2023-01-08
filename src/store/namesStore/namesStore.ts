import { getNamesApi, Names } from "../../api/names/names";
import { makeObservable, observable, action } from "mobx";
import { RootStore } from "../rootStore";

export default class NamesStore {
  root: RootStore;
  names: Names = {};
  isLoadingNames = false;

  constructor(root: RootStore) {
    this.root = root;
    makeObservable(this, {
      names: observable,
      isLoadingNames: observable,
      getNames: action,
      setNames: action,
      setIsLoadingNames: action,
    });
  }

  async getNames(): Promise<void> {
    this.setIsLoadingNames(true);
    const names = await getNamesApi();
    this.setNames(names);
    this.setIsLoadingNames(false);
  }

  setIsLoadingNames(state: boolean) {
    this.isLoadingNames = state;
  }

  setNames(names: Names) {
    this.names = names;
  }
}
