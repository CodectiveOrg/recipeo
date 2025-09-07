import type { ReactNode } from "react";

import CheckIcon from "@/icons/check.icon.tsx";

import { Ingredient } from "@/entities/ingredient.ts";

import TypographyComponent from "../../components/typography/typography.component.tsx";

import styles from "./ingredients.module.css";

type Props = {
  ingredients: Ingredient[];
};

export default function IngredientsSection({ ingredients }: Props): ReactNode {
  return (
    <div className={styles.ingredients}>
      <TypographyComponent variant="h2">Ingredients</TypographyComponent>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            <span className={styles.circle}>
              <CheckIcon />
            </span>
            <TypographyComponent span variant="p2">
              {ingredient.amount} {ingredient.unit} {ingredient.title}
            </TypographyComponent>
          </li>
        ))}
      </ul>
    </div>
  );
}
