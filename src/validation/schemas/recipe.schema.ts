import { z } from "zod";

import { IngredientSchema } from "@/validation/schemas/ingredient.schema.ts";
import { StepSchema } from "@/validation/schemas/step.schema.ts";
import { TagSchema } from "@/validation/schemas/tag.schema";

export const RecipeSchema = z.object({
  title: z.string().trim().nonempty(),
  description: z.string().trim().min(100),
  duration: z.coerce.number<number>().min(10),
  picture: z.string(),
  tags: z.array(TagSchema),
  ingredients: z.array(IngredientSchema),
  steps: z.array(StepSchema),
});

export type RecipeType = z.infer<typeof RecipeSchema>;
