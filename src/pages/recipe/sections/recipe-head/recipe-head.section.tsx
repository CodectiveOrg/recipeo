import type { ReactNode } from "react";


import TypographyComponent from "@/components/typography/typography.component.tsx";
import UserBadgeComponent from "@/components/user-badge/user-badge.component.tsx";

import type { Recipe } from "@/entities/recipe.ts";

import LikeButtonComponent from "@/pages/recipe/components/like-button/like-button.component.tsx";

import { formatDuration } from "@/utils/format.utils.ts";

import styles from "./recipe-head.module.css";

type Props = {
  recipe: Recipe;
};

export default function RecipeHeadSection({ recipe }: Props): ReactNode {
  return (
    <div className={styles["recipe-head"]}>
      <TypographyComponent as="h1" className={styles.title} variant="h2">
        {recipe.title}
      </TypographyComponent>
      <TypographyComponent
        as="p"
        className={styles.duration}
        variant="p2"
        color="text-secondary"
      >
        <span className={styles.tag}>{recipe.tags[0]?.title}</span>
        <span className={styles.tag}>{recipe.tags[1]?.title}</span>
        {formatDuration(recipe.duration)}
      </TypographyComponent>
      <UserBadgeComponent link user={recipe.user} size="large" />
      <LikeButtonComponent recipe={recipe} />
    </div>
  );
}
