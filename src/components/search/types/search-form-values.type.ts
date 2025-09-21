import { z } from "zod";

import { SearchFiltersSchema } from "@/validation/schemas/search/search-filters.schema.ts";

export type SearchFormValuesType = z.infer<typeof SearchFiltersSchema>;
