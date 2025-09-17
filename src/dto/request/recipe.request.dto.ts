import type { Ingredient } from "@/entities/ingredient.ts";

export type RecipeRequestDto = {
  ingredients: Omit<Ingredient, "id">[];
};
