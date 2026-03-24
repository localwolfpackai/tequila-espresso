"use client";

import { useCallback, useEffect, useState } from "react";

function parseJSON<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Hydrate after mount so server and first client render match; `initialValue` is only the JSON parse fallback.
  useEffect(() => {
    const item = window.localStorage.getItem(key);
    if (item === null) return;
    const parsed = parseJSON<T>(item, initialValue);
    queueMicrotask(() => {
      setStoredValue(parsed);
    });
  }, [key, initialValue]);

  const setValue = useCallback(
    (value: T | ((previous: T) => T)) => {
      setStoredValue((previous) => {
        const nextValue = value instanceof Function ? value(previous) : value;
        window.localStorage.setItem(key, JSON.stringify(nextValue));
        return nextValue;
      });
    },
    [key],
  );

  return [storedValue, setValue] as const;
}
