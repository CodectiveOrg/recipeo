import type { IngredientType } from "@/validation/schemas/ingredients.schema.ts";

export function generateIngredient(): IngredientType {
  return {
    id: globalThis.crypto.randomUUID(),
    title: "",
  };
}
