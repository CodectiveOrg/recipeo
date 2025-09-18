import { z } from "zod";

import { IngredientSchema } from "@/validation/schemas/ingredient.schema.ts";
import { StepSchema } from "@/validation/schemas/step.schema.ts";

export const RecipeSchema = z.object({
  ingredients: z.array(IngredientSchema),
  steps: z.array(StepSchema),
});

export type RecipeType = z.infer<typeof RecipeSchema>;
