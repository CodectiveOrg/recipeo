import type { ReactNode } from "react";

import IconComponent from "@/components/icon/icon.component.tsx";
import TypographyComponent from "@/components/typography/typography.component.tsx";
import UserBadgeComponent from "@/components/user-badge/user-badge.component.tsx";

import type { Recipe } from "@/entities/recipe.ts";

import { formatDuration } from "@/utils/format.utils.ts";

import styles from "./recipe-head.module.css";

type Props = {
  recipe: Recipe;
};

export default function RecipeHeadSection({ recipe }: Props): ReactNode {
  return (
    <div className={styles["recipe-head"]}>
      <div className={styles["recipe-info"]}>
        <TypographyComponent as="h2" variant="h2">
          {recipe.title}
        </TypographyComponent>
        <TypographyComponent as="p" variant="p2" color="text-secondary">
          Food Duration: {formatDuration(recipe.duration)}
        </TypographyComponent>
      </div>

      <div className={styles["user-info"]}>
        <UserBadgeComponent
          className={styles["user-badge"]}
          user={recipe.user}
        />
        <div className={styles.like}>
          <span className={styles.icon}>
            <IconComponent name="heart-angle-bold" />
          </span>
          <TypographyComponent as="h3" variant="h3">
            {recipe.likesCount} Likes
          </TypographyComponent>
        </div>
      </div>
    </div>
  );
}
