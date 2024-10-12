import { Dispatch, useEffect, useRef, useState } from 'react';

export type UseDebounceStateProps<S> = {
  initialValue?: S | (() => S);
  delay?: number;
};

type DebouncedState<S> = S;

export function useDebounceState<S>(
  props?: UseDebounceStateProps<S>,
): readonly [DebouncedState<S> | undefined, Dispatch<S | (() => S)>] {
  const { initialValue, delay = 300 } = props || {};
  const [debouncedValue, setDebouncedValue] = useState(initialValue);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const setState = (value: S | (() => S)) => {
    if (!delay) {
      setDebouncedValue(value);
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setDebouncedValue(value), delay);
  };

  return [debouncedValue, setState] as const;
}
