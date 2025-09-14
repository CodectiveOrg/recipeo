import type { ReactNode } from "react";

import { useQuery } from "@tanstack/react-query";

import { UserRecipesApi } from "@/api/user/user-recipes.api";

import LoadingComponent from "@/components/loading/loading.component";
import RecipeCardComponent from "@/components/recipe-card/recipe-card.component";

import type { Recipe } from "@/entities/recipe";

import styles from "./liked-tab.module.css";

export default function LikedTabComponent({
  profileId,
}: {
  profileId: string;
}): ReactNode {
  const { isPending, isError, data } = useQuery({
    queryKey: ["user", "liked", profileId],
    queryFn: () => UserRecipesApi({ profileId: profileId! }),
    enabled: !!profileId,
  });

  if (isPending) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <div>Error...</div>;
  }
  return (
    <>
      <div className={styles.liked}>
        {data.map((recipe: Recipe) => (
          <RecipeCardComponent recipe={recipe} key={recipe.id} />
        ))}
      </div>
    </>
  );
}
