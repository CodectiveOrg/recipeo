import type { ReactNode } from "react";

import { Link } from "react-router";

import IconComponent from "@/components/icon/icon.component";
import ArrowButtonComponent from "@/components/recipe-card/components/arrow-button/arrow-button.component.tsx";
import LikeButtonComponent from "@/components/recipe-card/components/like-button/like-button.component.tsx";
import TypographyComponent from "@/components/typography/typography.component";
import UserBadgeComponent from "@/components/user-badge/user-badge.component.tsx";

import { Recipe } from "@/entities/recipe";

import { formatDuration } from "@/utils/format.utils";

import styles from "./recipe-card.module.css";

type Props = {
  recipe: Recipe;
};

export default function RecipeCardComponent({ recipe }: Props): ReactNode {
  return (
    <Link className={styles["recipe-card"]} to={`/recipe/${recipe.id}`}>
      <div className={styles.content}>
        <img
          className={styles["recipe-picture"]}
          src={recipe.picture || "/placeholders/recipe.webp"}
          alt=""
        />
        <TypographyComponent
          as="p"
          className={styles.title}
          variant="h3"
          color="text"
          maxLines={2}
        >
          {recipe.title}
        </TypographyComponent>
        <UserBadgeComponent
          className={styles["user-badge"]}
          user={recipe.user}
        />
        <span className={styles.duration}>
          <IconComponent name="alarm-linear" />
          <TypographyComponent as="span" variant="s">
            {formatDuration(recipe.duration)}
          </TypographyComponent>
        </span>
        <LikeButtonComponent
          className={styles["like-button"]}
          recipeId={recipe.id}
          liked={recipe.isLikedByCurrentUser}
        />
        <ArrowButtonComponent className={styles["arrow-button"]} />
      </div>
    </Link>
  );
}
