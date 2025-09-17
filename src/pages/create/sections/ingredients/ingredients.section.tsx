import { type ReactNode } from "react";

import TypographyComponent from "@/components/typography/typography.component.tsx";

import AddButtonComponent from "@/pages/create/sections/ingredients/components/add-button/add-button.component.tsx";
import SortableInputsComponent from "@/pages/create/sections/ingredients/components/sortable-inputs/sortable-inputs.component.tsx";
import IngredientsDndProvider from "@/pages/create/sections/ingredients/providers/ingredients-dnd-provider.tsx";

import styles from "./ingredients.module.css";

export default function IngredientsSection(): ReactNode {
  return (
    <div className={styles.ingredients}>
      <TypographyComponent as="h2" variant="h2">
        Ingredients
      </TypographyComponent>
      <IngredientsDndProvider>
        <SortableInputsComponent />
      </IngredientsDndProvider>
      <AddButtonComponent />
    </div>
  );
}
