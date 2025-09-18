import type { MouseEvent, ReactNode } from "react";

import clsx from "clsx";

import IconButtonComponent, {
  IconButtonSkeleton,
} from "@/components/icon-button/icon-button.component.tsx";
import IconComponent, {
  IconSkeleton,
} from "@/components/icon/icon.component.tsx";

import useLikeMutation from "@/mutations/use-like.mutation.ts";

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
  const { mutateAsync, isPending } = useLikeMutation(recipeId);

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
      disabled={isPending}
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

export function LikeButtonSkeleton({ className }: Partial<Props>): ReactNode {
  return (
    <IconButtonSkeleton className={clsx(styles["like-button"], className)}>
      <IconSkeleton />
    </IconButtonSkeleton>
  );
}
