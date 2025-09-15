import { type ReactNode } from "react";

import IngredientsSection from "@/sections/ingredients/ingredients.section";
import StepsSection from "@/sections/steps/steps.section";

import IconComponent from "@/components/icon/icon.component";
import TypographyComponent from "@/components/typography/typography.component";
import UserBadgeComponent from "@/components/user-badge/user-badge.component";

import type { Recipe } from "@/entities/recipe";

import { formatDuration } from "@/utils/format.utils";

import styles from "./recipe-details.module.css";

type Props = {
  recipe: Recipe;
};

export default function RecipeDetailsComponent({ recipe }: Props): ReactNode {
  return (
    <div className={styles["recipe-details"]}>
      <div className={styles["section-one"]}>
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
      <hr />
      <div className={styles["section-two"]}>
        <TypographyComponent as="h2" variant="h2">
          Description
        </TypographyComponent>
        <TypographyComponent
          as="p"
          variant="p2"
          color="text-secondary"
          className={styles.description}
        >
          <span dangerouslySetInnerHTML={{ __html: recipe.description }} />
        </TypographyComponent>
      </div>
      <hr />
      <IngredientsSection ingredients={recipe.ingredients} />
      <hr />
      <StepsSection steps={recipe.steps} />
    </div>
  );
}
