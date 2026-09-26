import { useMemo, useRef } from "react";

export type DebouncedCallback<Params extends unknown[]> = ((...args: Params) => void) & {
  cancel: () => void;
};

export const useDebounceCallback = <Params extends unknown[], Return>(
  callback: (...args: Params) => Return,
  delay: number,
): DebouncedCallback<Params> => {
  const internalCallbackRef = useRef(callback);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const delayRef = useRef(delay);

  internalCallbackRef.current = callback;
  delayRef.current = delay;

  const debounced = useMemo(() => {
    const cancel = () => {
      if (!timerRef.current) return;
      clearTimeout(timerRef.current);
      timerRef.current = null;
    };

    const debouncedCallback = function (this: unknown, ...args: Params) {
      cancel();
      timerRef.current = setTimeout(() => {
        internalCallbackRef.current.apply(this, args);
      }, delayRef.current);
    };

    debouncedCallback.cancel = cancel;

    return debouncedCallback;
  }, []);

  return debounced;
};
