import { z } from "zod";

import { IngredientSchema } from "@/validation/schemas/ingredient.schema.ts";
import {
  RecipeDescriptionSchema,
  RecipeDurationSchema,
  RecipeTitleSchema,
} from "@/validation/schemas/recipe-fields.schema.ts";
import { StepSchema } from "@/validation/schemas/step.schema.ts";
import { TagArraySchema } from "@/validation/schemas/tag.schema";

export const RecipeSchema = z.object({
  title: RecipeTitleSchema,
  description: RecipeDescriptionSchema,
  duration: RecipeDurationSchema,
  picture: z.file("Please upload a valid jpg, png or webp image."),
  ingredients: z.array(IngredientSchema),
  steps: z.array(StepSchema),
  tags: TagArraySchema,
});

export type RecipeType = z.infer<typeof RecipeSchema>;
