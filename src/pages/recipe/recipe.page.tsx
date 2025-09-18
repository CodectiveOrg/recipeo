import type { ReactNode } from "react";

import { useParams } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { getRecipeApi } from "@/api/recipe/get-recipe.api";

import LoadingComponent from "@/components/loading/loading.component";

import RecipeCoverComponent from "@/pages/recipe/components/recipe-cover/recipe-cover.component.tsx";
import RecipePanelComponent from "@/pages/recipe/components/recipe-panel/recipe-panel.component.tsx";
import RecipeDescriptionSection from "@/pages/recipe/sections/recipe-description/recipe-description.section.tsx";
import RecipeHeadSection from "@/pages/recipe/sections/recipe-head/recipe-head.section.tsx";
import RecipeIngredientsSection from "@/pages/recipe/sections/recipe-ingredients/recipe-ingredients.section.tsx";
import RecipeStepsSection from "@/pages/recipe/sections/recipe-steps/recipe-steps.section.tsx";

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
      <title>{data?.title ?? "Recipe"}</title>
      <header />
      <main>
        <RecipeCoverComponent picture={data.picture} />
        <RecipePanelComponent
          className={styles.panel}
          contentClassName={styles.content}
        >
          <RecipeHeadSection recipe={data} />
          <hr />
          <RecipeDescriptionSection description={data.description} />
          <hr />
          <RecipeIngredientsSection ingredients={data.ingredients} />
          <hr />
          <RecipeStepsSection steps={data.steps} />
        </RecipePanelComponent>
      </main>
    </div>
  );
}
