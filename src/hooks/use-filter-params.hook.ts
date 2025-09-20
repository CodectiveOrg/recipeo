import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useFilterParams() {
  return useQueryStates({
    phrase: parseAsString.withDefault(""),
    tag: parseAsString.withDefault("all"),
    maxDuration: parseAsInteger.withDefault(60),
  });
}
