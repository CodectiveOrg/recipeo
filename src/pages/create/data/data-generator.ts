import type { IngredientType } from "@/validation/schemas/ingredient.schema.ts";
import type { StepType } from "@/validation/schemas/step.schema.ts";
import type { TagType } from "@/validation/schemas/tag.schema";

import type { Tag } from "@/entities/tag.ts";

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

export function generateTag(allTags: Tag[]): TagType {
  return {
    id: globalThis.crypto.randomUUID(),
    title: allTags[0].title,
  };
}
