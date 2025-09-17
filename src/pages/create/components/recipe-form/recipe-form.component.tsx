import { type ReactNode, useState } from "react";

import type { IngredientType } from "@/validation/schemas/ingredients.schema.ts";
import type { RecipeType } from "@/validation/schemas/recipe.schema.ts";

import { IngredientsContext } from "@/pages/create/context/ingredients.context.ts";
import { BLANK_INGREDIENT_DATA } from "@/pages/create/data/blank-ingredient.data.ts";

import styles from "./recipe-form.module.css";

type Props = {
  defaultValues: Partial<RecipeType>;
};

export default function RecipeFormComponent({
  defaultValues,
}: Props): ReactNode {
  const [ingredients, setIngredients] = useState<IngredientType[]>(
    defaultValues.ingredients ?? [{ ...BLANK_INGREDIENT_DATA }],
  );

  return (
    <IngredientsContext value={{ ingredients, setIngredients }}>
      <form className={styles["recipe-form"]}></form>
    </IngredientsContext>
  );
}
