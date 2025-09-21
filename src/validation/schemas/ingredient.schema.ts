import { z } from "zod";

import { RecipeTitleSchema } from "@/validation/schemas/recipe-fields.schema.ts";

export const IngredientSchema = z.object({
  title: RecipeTitleSchema,
});

export type IngredientType = z.infer<typeof IngredientSchema>;
