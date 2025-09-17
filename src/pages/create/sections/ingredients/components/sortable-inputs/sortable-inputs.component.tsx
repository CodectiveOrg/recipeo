import { type ReactNode, use } from "react";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { IngredientsContext } from "@/pages/create/context/ingredients.context.ts";
import IngredientInputComponent from "@/pages/create/sections/ingredients/components/ingredient-input/ingredient-input.component.tsx";

import styles from "./sortable-inputs.module.css";

export default function SortableInputsComponent(): ReactNode {
  const { ingredients } = use(IngredientsContext);

  return (
    <SortableContext
      items={ingredients.map((item) => item.id)}
      strategy={verticalListSortingStrategy}
    >
      <ul className={styles["sortable-ingredient-inputs"]}>
        {ingredients.map((ingredient, index) => (
          <IngredientInputComponent
            key={ingredient.id}
            index={index}
            ingredient={ingredient}
          />
        ))}
      </ul>
    </SortableContext>
  );
}
