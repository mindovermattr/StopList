import { LOCAL_STORAGE_KEYS, saveToLocalStorage } from "@/utils/localstorage";
import type { Middleware } from "@reduxjs/toolkit";
import { addToStopList, removeFromStopList } from "../slices/menu.slice";

export const stopListPersistMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  if (addToStopList.match(action) || removeFromStopList.match(action)) {
    const { menu } = store.getState();
    saveToLocalStorage(LOCAL_STORAGE_KEYS.STOPLIST, menu.stopList);
  }

  return result;
};
