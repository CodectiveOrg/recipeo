import { z } from "zod";

import { IngredientSchema } from "@/validation/schemas/ingredient.schema.ts";
import { StepSchema } from "@/validation/schemas/step.schema.ts";
import { TagSchema } from "@/validation/schemas/tag.schema";

export const RecipeSchema = z.object({
  title: z.string({ error: "Fill Food Name" }).trim().nonempty(),
  description: z.string({ error: "Fill Description" }).min(20),
  duration: z.coerce.number<number>().min(10),
  picture: z.instanceof(File),
  tags: z.array(TagSchema).min(1, "At least one tag is required"),
  ingredients: z
    .array(IngredientSchema)
    .min(1, "At least one ingredient is required"),
  steps: z.array(StepSchema).min(1, "At least one step is required"),
});

export type RecipeType = z.infer<typeof RecipeSchema>;
