import type { ComponentProps, ReactNode } from "react";

import { Link } from "react-router";

import clsx from "clsx";

import DurationBadgeComponent from "@/components/duration-badge/duration-badge.component.tsx";
import ImageComponent from "@/components/image/image.component.tsx";
import TypographyComponent from "@/components/typography/typography.component";
import UserBadgeComponent from "@/components/user-badge/user-badge.component.tsx";

import type { FeaturedRecipe } from "@/entities/featured-recipe.ts";

import styles from "./featured-recipe-card.module.css";

type Props = Omit<ComponentProps<typeof Link>, "to"> & {
  featured: FeaturedRecipe;
};

export default function FeaturedRecipeCardComponent({
  className,
  featured,
  ...otherProps
}: Props): ReactNode {
  const { recipe } = featured;

  return (
    <Link
      className={clsx(styles["featured-recipe-card"], className)}
      to={`/recipe/${recipe.id}`}
      {...otherProps}
    >
      <ImageComponent folder="featured" src={featured.picture} alt="" />
      <span className={styles.writings}>
        <TypographyComponent
          as="span"
          className={styles.title}
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
    </Link>
  );
}
