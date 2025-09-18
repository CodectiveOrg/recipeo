import type { IngredientType } from "@/validation/schemas/ingredient.schema.ts";
import type { StepType } from "@/validation/schemas/step.schema.ts";

export function generateIngredient(): IngredientType {
  return {
    id: globalThis.crypto.randomUUID(),
    title: "",
  };
}

export function generateStep(): StepType {
  return {
    id: globalThis.crypto.randomUUID(),
    description: "",
    picture: null,
  };
}
