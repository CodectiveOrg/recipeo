import { type ReactNode, useEffect } from "react";

import { useParams } from "react-router";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import { getUserRecipesApi } from "@/api/user/get-user-recipes.api.ts";

import InfiniteRecipesComponent from "@/components/infinite-recipes/infinite-recipes.component.tsx";

import { recipeKeys } from "@/queries/keys.ts";

export default function RecipesTabComponent(): ReactNode {
  const { userId } = useParams();
  const queryClient = useQueryClient();

  const queryResult = useInfiniteQuery({
    queryKey: recipeKeys.list({ type: "user", tab: "all", userId }),
    queryFn: ({ pageParam }) => getUserRecipesApi({ userId, pageParam }),
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
        queryKey: recipeKeys.list({ type: "user", tab: "all", userId }),
      });
    };
  }, [queryClient, userId]);

  return (
    <InfiniteRecipesComponent queryResult={queryResult} columnsCount={2} />
  );
}
