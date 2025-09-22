import type { ReactNode } from "react";

import { Link } from "react-router";

import clsx from "clsx";

import DurationBadgeComponent, {
  DurationBadgeSkeleton,
} from "@/components/duration-badge/duration-badge.component.tsx";
import ImageComponent, {
  ImageSkeleton,
} from "@/components/image/image.component.tsx";
import TypographyComponent, {
  TypographySkeleton,
} from "@/components/typography/typography.component";
import UserBadgeComponent, {
  UserBadgeSkeleton,
} from "@/components/user-badge/user-badge.component.tsx";

import type { FeaturedRecipe } from "@/entities/featured-recipe.ts";

import styles from "./featured-recipe-card.module.css";

type Props = {
  featured: FeaturedRecipe;
};

export default function FeaturedRecipeCardComponent({
  featured,
}: Props): ReactNode {
  const { recipe } = featured;

  return (
    <div className={styles["featured-recipe-card"]}>
      <ImageComponent
        className={styles.picture}
        folder="featured"
        src={featured.picture}
        alt=""
      />
      <span className={styles.writings}>
        <TypographyComponent
          className={styles.title}
          as={Link}
          to={`/recipe/${recipe.id}`}
          variant="h2"
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
      </span>
    </div>
  );
}

export function FeaturedRecipeCardSkeleton(): ReactNode {
  return (
    <div className={clsx(styles["featured-recipe-card"])}>
      <ImageSkeleton className={styles.picture} />
      <span className={styles.writings}>
        <TypographySkeleton
          as="span"
          className={styles.title}
          variant="h2"
          maxLines={2}
        />
        <UserBadgeSkeleton className={styles["user-badge"]} />
        <DurationBadgeSkeleton className={styles["duration-badge"]} />
      </span>
    </div>
  );
}
