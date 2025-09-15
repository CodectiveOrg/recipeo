import type { ReactNode } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import clsx from "clsx";

import { likeRecipeApi } from "@/api/recipe/like-recipe.api.ts";

import IconComponent from "@/components/icon/icon.component";
import TypographyComponent from "@/components/typography/typography.component.tsx";

import type { Recipe } from "@/entities/recipe.ts";

import styles from "./like-button.module.css";

type Props = {
  className?: string;
  recipe: Recipe;
};

export default function LikeButtonComponent({
  className,
  recipe,
}: Props): ReactNode {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["like-button", recipe.id],
    mutationFn: likeRecipeApi,
    onError: (err) => {
      toast.error(err.message);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["recipe"] });
    },
  });

  const handleLikeButtonClick = async (): Promise<void> => {
    await mutateAsync({
      id: recipe.id,
      action: recipe.isLikedByCurrentUser ? "unlike" : "like",
    });
  };

  return (
    <button
      className={clsx(
        styles["like-button"],
        recipe.isLikedByCurrentUser && styles.liked,
        className,
      )}
      disabled={isPending}
      onClick={handleLikeButtonClick}
    >
      <span className={styles.icon}>
        {recipe.isLikedByCurrentUser ? (
          <IconComponent name="heart-bold" />
        ) : (
          <IconComponent name="heart-linear" />
        )}
      </span>
      <TypographyComponent as="span" variant="h3">
        {recipe.likesCount} Likes
      </TypographyComponent>
    </button>
  );
}
