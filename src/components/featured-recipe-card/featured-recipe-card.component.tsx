import type { ComponentProps, ReactNode } from "react";

import { Link } from "react-router";

import clsx from "clsx";

import IconComponent from "@/components/icon/icon.component";
import TypographyComponent from "@/components/typography/typography.component";

import type { FeaturedRecipe } from "@/entities/featured-recipe.ts";

import { formatDuration } from "@/utils/format.utils.ts";

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
      <img src={featured.picture || "/placeholders/featured.webp"} alt="" />
      <span className={styles.writings}>
        <TypographyComponent
          span
          className={styles.title}
          variant="h2"
          maxLines={2}
        >
          {recipe.title}
        </TypographyComponent>
        <span className={styles.user}>
          <img
            src={recipe.user.picture || "/placeholders/user.svg"}
            alt="User's Profile Picture"
          />
          <TypographyComponent
            span
            ellipsis
            className={styles.username}
            variant="s"
          >
            {recipe.user.username}
          </TypographyComponent>
        </span>
        <span className={styles.duration}>
          <IconComponent name="alarm-linear" />
          <TypographyComponent span variant="s">
            {formatDuration(recipe.duration)}
          </TypographyComponent>
        </span>
      </span>
    </Link>
  );
}
