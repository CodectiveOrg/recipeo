import type { MouseEvent, ReactNode } from "react";

import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";

import clsx from "clsx";

import { likeRecipeApi } from "@/api/recipe/like-recipe.api.ts";

import IconButtonComponent from "@/components/icon-button/icon-button.component.tsx";
import IconComponent from "@/components/icon/icon.component.tsx";

import styles from "./like-button.module.css";

type Props = {
  className?: string;
  recipeId: number;
  liked?: boolean;
};

export default function LikeButtonComponent({
  className,
  recipeId,
  liked,
}: Props): ReactNode {
  const { mutateAsync } = useMutation({
    mutationKey: ["recipe-card", recipeId],
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
    e.preventDefault();

    await mutateAsync({
      id: recipeId,
      action: liked ? "unlike" : "like",
    });
  };

  return (
    <IconButtonComponent
      className={clsx(styles["like-button"], className)}
      onClick={handleLikeButtonClick}
    >
      {liked ? (
        <IconComponent className={styles.liked} name="heart-bold" />
      ) : (
        <IconComponent className={styles.unliked} name="heart-linear" />
      )}
    </IconButtonComponent>
  );
}
