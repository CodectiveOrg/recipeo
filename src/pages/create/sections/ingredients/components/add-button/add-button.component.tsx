import { type ReactNode, use } from "react";

import ButtonComponent from "@/components/button/button.component.tsx";

import { IngredientsContext } from "@/pages/create/context/ingredients.context.ts";
import { BLANK_INGREDIENT_DATA } from "@/pages/create/data/blank-ingredient.data.ts";

import styles from "./add-button.module.css";

export default function AddButtonComponent(): ReactNode {
  const { setIngredients } = use(IngredientsContext);

  const handleButtonClick = (): void => {
    setIngredients((items) => [...items, { ...BLANK_INGREDIENT_DATA }]);
  };

  return (
    <ButtonComponent
      className={styles["add-more-ingredients-button"]}
      variant="outlined"
      color="secondary"
      size="medium"
      onClick={handleButtonClick}
    >
      <span className={styles.icon}>+</span>
      Add More Ingredients
    </ButtonComponent>
  );
}
