import { type ReactNode, use } from "react";

import ButtonComponent from "@/components/button/button.component.tsx";

import { IngredientsContext } from "@/pages/create/context/ingredients.context.ts";
import { generateIngredient } from "@/pages/create/data/data-generator.ts";

import styles from "./add-button.module.css";

export default function AddButtonComponent(): ReactNode {
  const { setIngredients } = use(IngredientsContext);

  const handleButtonClick = (): void => {
    setIngredients((items) => [...items, generateIngredient()]);
  };

  return (
    <ButtonComponent
      className={styles["add-more-ingredients-button"]}
      variant="outlined"
      color="secondary"
      size="medium"
      type="button"
      onClick={handleButtonClick}
    >
      <span className={styles.icon}>+</span>
      Add More Ingredients
    </ButtonComponent>
  );
}
