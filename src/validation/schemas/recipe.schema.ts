import { z } from "zod";

import { IngredientSchema } from "@/validation/schemas/ingredient.schema.ts";
import { StepSchema } from "@/validation/schemas/step.schema.ts";
import { TagSchema } from "@/validation/schemas/tag.schema";

export const RecipeSchema = z.object({
  ingredients: z.array(IngredientSchema),
  steps: z.array(StepSchema),
  tags: z.array(TagSchema),
});

export type RecipeType = z.infer<typeof RecipeSchema>;
