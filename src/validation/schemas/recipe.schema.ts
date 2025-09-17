import { z } from "zod";

import { IngredientSchema } from "@/validation/schemas/ingredients.schema.ts";

export const RecipeSchema = z.object({
  ingredients: z.array(IngredientSchema),
});

export type RecipeType = z.infer<typeof RecipeSchema>;
