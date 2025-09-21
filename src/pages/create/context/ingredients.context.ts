import type { IngredientType } from "@/validation/schemas/recipe/ingredient.schema.ts";

import {
  type BaseItem,
  createBaseContext,
} from "@/pages/create/context/base.context.ts";

export const IngredientsContext = createBaseContext<
  BaseItem & IngredientType
>();
