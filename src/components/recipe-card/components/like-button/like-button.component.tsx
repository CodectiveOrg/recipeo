import type { MouseEvent, ReactNode } from "react";

import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";

import clsx from "clsx";

import { likeRecipeApi } from "@/api/recipe/like-recipe.api.ts";

import IconButtonComponent from "@/components/icon-button/icon-button.component.tsx";
import IconComponent from "@/components/icon/icon.component.tsx";

import { queryClient } from "@/providers/query.provider";

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
    mutationKey: ["like-button", recipeId],
    mutationFn: likeRecipeApi,
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["like-button", recipeId] });

      const oldData = queryClient.getQueryData(["like-button", recipeId]);

      queryClient.setQueryData(["like-button", recipeId], data);

      return { oldData };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(["like-button", recipeId], context?.oldData);
      toast.error(err.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries();
    },
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
