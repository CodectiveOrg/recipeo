import type { IngredientType } from "@/validation/schemas/ingredients.schema.ts";

export const BLANK_INGREDIENT_DATA: Readonly<IngredientType> = Object.freeze({
  id: globalThis.crypto.randomUUID(),
  title: "",
});
