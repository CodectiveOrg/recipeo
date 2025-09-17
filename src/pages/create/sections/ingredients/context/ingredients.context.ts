import { type Dispatch, type SetStateAction, createContext } from "react";

import type { IngredientType } from "@/validation/schemas/ingredients.schema.ts";

type ContextValue = {
  ingredients: IngredientType[];
  setIngredients: Dispatch<SetStateAction<IngredientType[]>>;
};

export const IngredientsContext = createContext<ContextValue>(
  {} as ContextValue,
);
