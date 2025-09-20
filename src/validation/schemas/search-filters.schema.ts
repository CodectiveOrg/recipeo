import { z } from "zod";

export const SearchFiltersSchema = z.object({
  phrase: z.coerce.string<string>(),
  tag: z.coerce.string<string>(),
  maxDuration: z.coerce.number<number>(),
});
