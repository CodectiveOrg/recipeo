import type { ReactNode } from "react";

import { useQuery } from "@tanstack/react-query";

import { UserRecipesApi } from "@/api/user/user-recipes.api";

import LoadingComponent from "@/components/loading/loading.component";
import RecipeCardComponent from "@/components/recipe-card/recipe-card.component";

import type { Recipe } from "@/entities/recipe";

import styles from "./recipes-tab.module.css";

export default function RecipesTabComponent({
  profileId,
}: {
  profileId: string;
}): ReactNode {
  const { isPending, isError, data } = useQuery({
    queryKey: ["user", "recipes", profileId],
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
      <div className={styles.recipes}>
        {data.map((recipe: Recipe) => (
          <RecipeCardComponent recipe={recipe} key={recipe.id} />
        ))}
      </div>
    </>
  );
}
