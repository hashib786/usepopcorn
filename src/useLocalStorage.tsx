import { useState, useEffect } from "react";

export const useLocalStorage = <T,>(
  key: string,
  intialState: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    const data = localStorage.getItem(key);
    if (!data) return intialState;
    return JSON.parse(data);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};
