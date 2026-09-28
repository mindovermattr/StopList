import type { StopListItem } from "@/store/slices/menu.slice";

export const LOCAL_STORAGE_KEYS = {
  STOPLIST: "stoplist",
} as const;

type LocalStorageSchema = {
  stoplist: StopListItem[];
};

type LocalStorageKey = (typeof LOCAL_STORAGE_KEYS)[keyof typeof LOCAL_STORAGE_KEYS];

export function saveToLocalStorage<T extends LocalStorageKey>(
  key: T,
  value: LocalStorageSchema[T],
): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadFromLocalStorage<T extends LocalStorageKey>(
  key: T,
): LocalStorageSchema[T] | null {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

export function clearLocalStorage(key: LocalStorageKey): void {
  localStorage.removeItem(key);
}
