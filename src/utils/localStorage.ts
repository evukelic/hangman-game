/* eslint-disable @typescript-eslint/no-explicit-any */
const LOCAL_STORAGE_KEY = "hangman_quote_";

export const getLocalStorageItem = (key: string): string | null => {
  return localStorage.getItem(key);
};

export const setLocalStorageItem = (key: string, value: any): void => {
  const item = JSON.stringify(value);

  if (!getLocalStorageItem(LOCAL_STORAGE_KEY + key)) {
    localStorage.setItem(LOCAL_STORAGE_KEY + key, item);
  }
};

export const getRandomLocalStorageItem = (): any | null => {
  const keys: string[] = Object.keys(localStorage);
  const randomKey: string = keys[Math.floor(Math.random() * keys.length)];

  return JSON.parse(getLocalStorageItem(randomKey)!);
};

export const getNumberOfStoredQuotes = () => {
  const keys: string[] = Object.keys(localStorage);

  return keys.filter((key) => key.startsWith(LOCAL_STORAGE_KEY)).length;
};
