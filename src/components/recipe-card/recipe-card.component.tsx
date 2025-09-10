import type { MouseEvent, ReactNode } from "react";

import { Link } from "react-router";

import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";

import clsx from "clsx";

import { likeRecipeApi } from "@/api/recipe/like-recipe.api";

import IconButtonComponent from "@/components/icon-button/icon-button.component";
import IconComponent from "@/components/icon/icon.component";
import TypographyComponent from "@/components/typography/typography.component";

import { Recipe } from "@/entities/recipe";

import { formatDuration } from "@/utils/format.utils";

import styles from "./recipe-card.module.css";

type Props = {
  recipe: Recipe;
};

export default function RecipeCardComponent({ recipe }: Props): ReactNode {
  const { mutateAsync } = useMutation({
    mutationKey: ["recipe-card", recipe.id],
    mutationFn: likeRecipeApi,
    onError: (error): void => {
      toast.error(error.message);
    },
    onSuccess: () => {},
  });

  const handleLikeButtonClick = async (
    e: MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    e.stopPropagation();

    await mutateAsync({
      id: recipe.id,
      action: recipe.isLikedByCurrentUser ? "unlike" : "like",
    });
  };

  return (
    <Link className={styles["recipe-card"]} to={`/recipe/${recipe.id}`}>
      <div className={styles.content}>
        <img
          className={styles["recipe-picture"]}
          src={recipe.picture || "/placeholders/featured.webp"}
          alt=""
        />
        <IconButtonComponent
          className={styles.like}
          onClick={handleLikeButtonClick}
        >
          {recipe.isLikedByCurrentUser ? (
            <IconComponent className={styles.liked} name="heart-bold" />
          ) : (
            <IconComponent className={styles.unliked} name="heart-linear" />
          )}
        </IconButtonComponent>
        <TypographyComponent
          as="p"
          className={styles.title}
          variant="h2"
          color="text"
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
            as="span"
            ellipsis
            className={styles.username}
            variant="s"
          >
            {recipe.user.username}
          </TypographyComponent>
        </span>
        <IconButtonComponent className={styles.arrow}>
          <IconComponent name="map-arrow-right-bold" />
        </IconButtonComponent>
        <span className={styles.duration}>
          <IconComponent name="clock-circle-outline" />
          <TypographyComponent as="span" variant="s">
            {formatDuration(recipe.duration)}
          </TypographyComponent>
        </span>
      </div>
    </Link>
  );
}
