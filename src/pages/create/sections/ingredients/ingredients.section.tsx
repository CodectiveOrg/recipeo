import { type ReactNode, useState } from "react";

import { type IngredientType } from "@/validation/schemas/ingredients.schema.ts";

import TypographyComponent from "@/components/typography/typography.component.tsx";

import AddButtonComponent from "@/pages/create/sections/ingredients/components/add-button/add-button.component.tsx";
import SortableInputsComponent from "@/pages/create/sections/ingredients/components/sortable-inputs/sortable-inputs.component.tsx";
import { IngredientsContext } from "@/pages/create/sections/ingredients/context/ingredients.context.ts";
import { BLANK_INGREDIENT_DATA } from "@/pages/create/sections/ingredients/data/blank-ingredient.data.ts";
import IngredientsDndProvider from "@/pages/create/sections/ingredients/providers/ingredients-dnd-provider.tsx";

import styles from "./ingredients.module.css";

export default function IngredientsSection(): ReactNode {
  const [ingredients, setIngredients] = useState<IngredientType[]>([
    { ...BLANK_INGREDIENT_DATA },
  ]);

  return (
    <IngredientsContext value={{ ingredients, setIngredients }}>
      <div className={styles.ingredients}>
        <TypographyComponent as="h2" variant="h2">
          Ingredients
        </TypographyComponent>
        <IngredientsDndProvider>
          <SortableInputsComponent />
        </IngredientsDndProvider>
        <AddButtonComponent />
      </div>
    </IngredientsContext>
  );
}
