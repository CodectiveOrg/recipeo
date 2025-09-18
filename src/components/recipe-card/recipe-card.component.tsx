import type { ReactNode } from "react";

import { Link } from "react-router";

import DurationBadgeComponent, {
  DurationBadgeSkeleton,
} from "@/components/duration-badge/duration-badge.component.tsx";
import ImageComponent, {
  ImageSkeleton,
} from "@/components/image/image.component.tsx";
import ArrowButtonComponent, {
  ArrowButtonSkeleton,
} from "@/components/recipe-card/components/arrow-button/arrow-button.component.tsx";
import LikeButtonComponent, {
  LikeButtonSkeleton,
} from "@/components/recipe-card/components/like-button/like-button.component.tsx";
import TypographyComponent, {
  TypographySkeleton,
} from "@/components/typography/typography.component";
import UserBadgeComponent, {
  UserBadgeSkeleton,
} from "@/components/user-badge/user-badge.component.tsx";

import { Recipe } from "@/entities/recipe";

import styles from "./recipe-card.module.css";

type Props = {
  recipe: Recipe;
};

export default function RecipeCardComponent({ recipe }: Props): ReactNode {
  return (
    <Link className={styles["recipe-card"]} to={`/recipe/${recipe.id}`}>
      <div className={styles.content}>
        <ImageComponent
          className={styles["recipe-picture"]}
          folder="recipe"
          src={recipe.picture}
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
        <DurationBadgeComponent
          className={styles["duration-badge"]}
          duration={recipe.duration}
        />
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

export function RecipeCardSkeleton(): ReactNode {
  return (
    <div className={styles["recipe-card"]}>
      <div className={styles.content}>
        <ImageSkeleton className={styles["recipe-picture"]} />
        <TypographySkeleton
          as="p"
          className={styles.title}
          variant="h3"
          color="text"
          maxLines={2}
        />
        <UserBadgeSkeleton className={styles["user-badge"]} />
        <DurationBadgeSkeleton className={styles["duration-badge"]} />
        <LikeButtonSkeleton className={styles["like-button"]} />
        <ArrowButtonSkeleton className={styles["arrow-button"]} />
      </div>
    </div>
  );
}
