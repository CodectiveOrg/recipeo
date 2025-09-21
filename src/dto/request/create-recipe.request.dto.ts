import type { IngredientType } from "@/validation/schemas/ingredient.schema.ts";
import type { StepType } from "@/validation/schemas/step.schema.ts";
import type { TagType } from "@/validation/schemas/tag.schema.ts";

export type CreateRecipeRequestDto = {
  title: string;
  description: string;
  duration: number;
  picture: string | File | null;
  ingredients: IngredientType[];
  steps: StepType[];
  tags: TagType[];
};
