import { type ReactNode, useEffect } from "react";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import { getRecentRecipesApi } from "@/api/recipe/get-recent-recipes.api.ts";

import HeaderWithBackButtonComponent from "@/components/header-with-back-button/header-with-back-button.component.tsx";
import InfiniteRecipesComponent from "@/components/infinite-recipes/infinite-recipes.component.tsx";
import TitleComponent from "@/components/title/title.component.tsx";

import { recipeKeys } from "@/queries/keys.ts";

import styles from "./recent.module.css";

export default function RecentPage(): ReactNode {
  const queryClient = useQueryClient();

  const queryResult = useInfiniteQuery({
    queryKey: recipeKeys.list({ type: "recent" }),
    queryFn: getRecentRecipesApi,
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
        queryKey: recipeKeys.list({ type: "recent" }),
      });
    };
  }, [queryClient]);

  return (
    <div className={styles.recent}>
      <TitleComponent>Recent Recipes</TitleComponent>
      <HeaderWithBackButtonComponent title="Recent Recipes" />
      <main>
        <InfiniteRecipesComponent queryResult={queryResult} />
      </main>
    </div>
  );
}
