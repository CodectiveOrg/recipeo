import { type ReactNode } from "react";

import { useQuery } from "@tanstack/react-query";

import { searchRecipesApi } from "@/api/recipe/search-recipes.api.ts";

import LoadingComponent from "@/components/loading/loading.component.tsx";
import RecipeCardComponent from "@/components/recipe-card/recipe-card.component.tsx";

import useFilterParams from "@/hooks/use-filter-params.hook.ts";

import styles from "./search-result.module.css";

export default function SearchResultComponent(): ReactNode {
  const [params] = useFilterParams();

  const { data, isPending, isError } = useQuery({
    queryKey: ["recipes", "search", params],
    queryFn: () => searchRecipesApi(params),
  });

  if (isPending) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <>Error...</>;
  }

  return (
    <div className={styles["search-result"]}>
      <ul>
        {data.map((recipe) => (
          <RecipeCardComponent key={recipe.id} recipe={recipe} />
        ))}
      </ul>
    </div>
  );
}
