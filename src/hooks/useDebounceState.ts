import type { Dispatch, SetStateAction } from "react";
import { useCallback, useRef, useState } from "react";

export function useDebounceState<T>(
  initialValue: T,
  delay: number,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initialValue);
  const valueRef = useRef<T>(initialValue);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedSetValue = useCallback<Dispatch<SetStateAction<T>>>(
    (newValue) => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
      const nextValue =
        typeof newValue === "function" ? (newValue as (prev: T) => T)(valueRef.current) : newValue;
      valueRef.current = nextValue;
      timeoutRef.current = setTimeout(() => {
        setValue(nextValue);
        timeoutRef.current = null;
      }, delay);
    },
    [delay],
  );

  return [value, debouncedSetValue];
}
