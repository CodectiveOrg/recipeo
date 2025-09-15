import type { ReactNode } from "react";

import { useParams } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { getRecipeApi } from "@/api/recipe/get-recipe.api";

import LoadingComponent from "@/components/loading/loading.component";

import RecipeCoverComponent from "@/pages/recipe/components/recipe-cover/recipe-cover.component.tsx";
import RecipeDetailsComponent from "@/pages/recipe/components/recipe-details/recipe-details.component.tsx";
import RecipePanelComponent from "@/pages/recipe/components/recipe-panel/recipe-panel.component.tsx";

import styles from "./recipe.module.css";

export default function RecipePage(): ReactNode {
  const { recipeId } = useParams();

  const { isPending, isError, data } = useQuery({
    queryKey: ["recipe", recipeId],
    queryFn: () => getRecipeApi({ recipeId }),
  });

  if (isPending) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <div className={styles.recipe}>
      <header />
      <main>
        <RecipeCoverComponent picture={data.picture} />
        <RecipePanelComponent className={styles.panel}>
          <RecipeDetailsComponent recipe={data} />
        </RecipePanelComponent>
      </main>
    </div>
  );
}
