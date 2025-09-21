import type { IngredientType } from "@/validation/schemas/recipe/ingredient.schema.ts";
import type { StepType } from "@/validation/schemas/recipe/step.schema.ts";
import type { TagType } from "@/validation/schemas/recipe/tag.schema.ts";

import type { Tag } from "@/entities/tag.ts";

import type { BaseItem } from "@/pages/create/context/base.context.ts";

export function generateIngredient(): BaseItem & IngredientType {
  return {
    id: globalThis.crypto.randomUUID(),
    title: "",
  };
}

export function generateStep(): BaseItem & StepType {
  return {
    id: globalThis.crypto.randomUUID(),
    description: "",
    picture: null,
  };
}

export function generateTag(allTags: Tag[]): BaseItem & TagType {
  return {
    id: globalThis.crypto.randomUUID(),
    title: allTags[0].title,
  };
}
