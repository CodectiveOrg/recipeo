import type { ReactNode } from "react";

import CheckCircleComponent from "@/components/check-circle/check-circle.component.tsx";
import TypographyComponent from "@/components/typography/typography.component.tsx";

import { Ingredient } from "@/entities/ingredient.ts";

import styles from "./recipe-ingredients.module.css";

type Props = {
  ingredients: Ingredient[];
};

export default function RecipeIngredientsSection({
  ingredients,
}: Props): ReactNode {
  return (
    <div className={styles.ingredients}>
      <TypographyComponent as="h2" variant="h2">
        Ingredients
      </TypographyComponent>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            <CheckCircleComponent active />
            <TypographyComponent as="span" variant="p2">
              {ingredient.title}
            </TypographyComponent>
          </li>
        ))}
      </ul>
    </div>
  );
}
