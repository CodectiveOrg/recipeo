import type { ReactNode } from "react";

import { useQuery } from "@tanstack/react-query";

import { UserRecipesApi } from "@/api/user/user-recipes.api";

import RecipeCardComponent from "@/components/recipe-card/recipe-card.component";

import type { Recipe } from "@/entities/recipe";

import styles from "./recipes-tab.module.css";

export default function RecipesTabComponent({
  profileId,
}: {
  profileId: string;
}): ReactNode {
  const { data: userRecipes } = useQuery({
    queryKey: ["user-recipes", profileId],
    queryFn: () => UserRecipesApi({ profileId: profileId! }),
    enabled: !!profileId,
  });

  if (!userRecipes) return null;
  return (
    <>
      <div className={styles.recipes}>
        {userRecipes.map((recipe: Recipe) => (
          <RecipeCardComponent recipe={recipe} key={recipe.id} />
        ))}
      </div>
    </>
  );
}
