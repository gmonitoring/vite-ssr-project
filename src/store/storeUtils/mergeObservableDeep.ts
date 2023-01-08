import {observable, runInAction} from "mobx";

export function mergeObservableDeep(
    target: Record<string, any>,
    source: Record<string, any>
) {
    for (const key in source) {
        if (!source.hasOwnProperty(key)) continue;

        const sourceItem = source[key];
        const targetItem = target[key];

        if (Object.prototype.toString.call(sourceItem) === "[object Object]") {
            if (!targetItem) runInAction(() => (target[key] = observable({})));

            mergeObservableDeep(target[key], sourceItem);
        } else runInAction(() => (target[key] = sourceItem));
    }

    return target;
}