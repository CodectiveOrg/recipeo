import type { ComponentProps, MouseEvent, ReactNode } from "react";

import { Link } from "react-router";

import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { likeRecipeApi } from "@/api/recipe/like-recipe.api";
import { unlikeRecipeApi } from "@/api/recipe/unlike-recipe.api";

import IconButtonComponent from "@/components/icon-button/icon-button.component";
import IconComponent from "@/components/icon/icon.component";
import TypographyComponent from "@/components/typography/typography.component";

import { Recipe } from "@/entities/recipe";

import styles from "./recipe-card.module.css";

type Props = Omit<ComponentProps<typeof Link>, "to"> & {
  recipe: Recipe;
};

export default function RecipeCardComponent({ recipe }: Props): ReactNode {
  const { mutate: likeMutate } = useMutation({
    mutationKey: ["recipe-card", recipe.id],
    mutationFn: likeRecipeApi,
    onError: (error): void => {
      toast.error(error.message);
    },
    onSuccess: () => {},
  });

  const handleLikeUnlikeRecipe = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    likeMutate(recipe.id);
  };

  return (
    <Link className={styles["recipe-card"]} to={`/recipe/${recipe.id}`}>
      <div className={styles.content}>
        <div className={styles["image-wrapper"]}>
          <img src={recipe.picture || "/placeholders/featured.webp"} alt="" />
          <IconButtonComponent onClick={handleLikeUnlikeRecipe}>
            <IconComponent name="heart-bold" />
          </IconButtonComponent>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.writings}>
            <TypographyComponent as="p" variant="p1" color="text" ellipsis>
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
          </div>
          <IconButtonComponent>
            <IconComponent name="arrow-right-linear" />
          </IconButtonComponent>
        </div>
      </div>
    </Link>
  );
}
