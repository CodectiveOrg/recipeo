import type { Ingredient } from "@/entities/ingredient";
import type { Step } from "@/entities/step";
import type { Tag } from "@/entities/tag";

export type RecipeRequestDto = {
  title: string;
  description: string;
  duration: number;
  picture: string;
  tags: Tag[];
  ingredients: Ingredient[];
  steps: Step[];
};
