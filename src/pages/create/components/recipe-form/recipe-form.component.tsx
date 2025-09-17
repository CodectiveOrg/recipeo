import { type ReactNode, useState } from "react";

import type { IngredientType } from "@/validation/schemas/ingredients.schema.ts";
import type { RecipeType } from "@/validation/schemas/recipe.schema.ts";

import { IngredientsContext } from "@/pages/create/context/ingredients.context.ts";
import { generateIngredient } from "@/pages/create/data/data-generator.ts";
import IngredientsSection from "@/pages/create/sections/ingredients/ingredients.section.tsx";

import styles from "./recipe-form.module.css";

type Props = {
  defaultValues?: Partial<RecipeType>;
};

export default function RecipeFormComponent({
  defaultValues,
}: Props): ReactNode {
  const [ingredients, setIngredients] = useState<IngredientType[]>(() => {
    return defaultValues?.ingredients ?? [generateIngredient()];
  });

  return (
    <IngredientsContext value={{ ingredients, setIngredients }}>
      <form className={styles["recipe-form"]}>
        <IngredientsSection />
      </form>
    </IngredientsContext>
  );
}
