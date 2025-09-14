import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

export const useLocalStorage = (
  key: string,
  initialValue: string,
): [string, Dispatch<SetStateAction<string>>] => {
  const [value, setValue] = useState<string>(
    localStorage.getItem(key) || initialValue,
  );

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
};
