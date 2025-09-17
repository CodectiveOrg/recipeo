import { type ReactNode } from "react";

import type { RecipeType } from "@/validation/schemas/recipe.schema.ts";

import IngredientsSection from "@/pages/create/sections/ingredients/ingredients.section.tsx";

import styles from "./recipe-form.module.css";

type Props = {
  defaultValues?: Partial<RecipeType>;
};

export default function RecipeFormComponent({
  defaultValues,
}: Props): ReactNode {
  return (
    <form className={styles["recipe-form"]}>
      <IngredientsSection defaultValues={defaultValues} />
    </form>
  );
}
