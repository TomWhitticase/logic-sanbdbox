import { useCallback, useState } from "react";
import { z, ZodType } from "zod";

type Value<T extends ZodType> = z.infer<T>;
type ValueSetter<T extends ZodType> = (currentValue: Value<T>) => void;

type UseZodls<T extends ZodType> = [
  value: Value<T>,
  set: (value: Value<T> | ValueSetter<T>) => void
];

export const useLocalStorage = <T extends ZodType>(
  key: string,
  schema: T,
  defaultValue: Value<T>
): UseZodls<T> => {
  const get = useCallback(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(key) || "");
      const parsed = schema.safeParse(stored);
      if (parsed.success) {
        return parsed.data;
      }
      return defaultValue;
    } catch (error) {
      console.log(error);
      return defaultValue;
    }
  }, [key, schema, defaultValue]);

  const [value, setValue] = useState<Value<T> | undefined>(get);

  const set = useCallback(
    (value: Value<T> | ValueSetter<T>) => {
      let newValue: Value<T> = value;
      if (typeof value === "function") {
        const valueSetter = value as ValueSetter<T>;
        const current = get();
        newValue = valueSetter(current);
      }

      schema.parse(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    },
    [setValue, get, schema, key]
  );

  return [value, set];
};
