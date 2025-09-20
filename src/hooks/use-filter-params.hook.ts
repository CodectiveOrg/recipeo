import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

import {
  maxDurationFilter,
  phraseFilter,
  tagFilter,
} from "@/configs/search-filters.config.ts";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useFilterParams() {
  return useQueryStates({
    phrase: parseAsString.withDefault(phraseFilter.defaultValue),
    tag: parseAsString.withDefault(tagFilter.defaultValue),
    maxDuration: parseAsInteger.withDefault(maxDurationFilter.defaultValue),
  });
}
