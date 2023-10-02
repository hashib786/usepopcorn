import { useEffect } from "react";

export const useKey = (key: string, action: () => void) => {
  useEffect(() => {
    const callback = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === key.toLowerCase()) action();
    };
    document.addEventListener("keydown", callback);

    return () => document.removeEventListener("keydown", callback);
  }, [action, key]);
};
