import { type ReactNode, useEffect } from "react";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import { getPopularRecipesApi } from "@/api/recipe/get-popular-recipes.api.ts";

import HeaderWithBackButtonComponent from "@/components/header-with-back-button/header-with-back-button.component.tsx";
import InfiniteRecipesComponent from "@/components/infinite-recipes/infinite-recipes.component.tsx";
import TitleComponent from "@/components/title/title.component.tsx";

import { recipeKeys } from "@/queries/keys.ts";

import styles from "./popular.module.css";

export default function PopularPage(): ReactNode {
  const queryClient = useQueryClient();

  const queryResult = useInfiniteQuery({
    queryKey: recipeKeys.list({ type: "popular" }),
    queryFn: getPopularRecipesApi,
    getNextPageParam: (last) => {
      if (last.currentPage >= last.lastPage) {
        return null;
      }

      return last.currentPage + 1;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: recipeKeys.list({ type: "popular" }),
      });
    };
  }, [queryClient]);

  return (
    <div className={styles.popular}>
      <TitleComponent>Popular Recipes</TitleComponent>
      <HeaderWithBackButtonComponent title="Popular Recipes" />
      <main>
        <InfiniteRecipesComponent queryResult={queryResult} />
      </main>
    </div>
  );
}
