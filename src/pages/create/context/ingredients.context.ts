import type { IngredientType } from "@/validation/schemas/ingredient.schema.ts";

import { createBaseContext } from "@/pages/create/context/base.context.ts";

export const IngredientsContext = createBaseContext<IngredientType>();
