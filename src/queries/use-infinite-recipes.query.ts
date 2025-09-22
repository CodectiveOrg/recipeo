import { useEffect } from "react";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import { getRecipesApi } from "@/api/recipe/get-recipes.api.ts";

import { type InfiniteRecipesType, recipeKeys } from "@/queries/keys.ts";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useInfiniteRecipesQuery(type: InfiniteRecipesType) {
  const queryClient = useQueryClient();

  const queryResult = useInfiniteQuery({
    queryKey: recipeKeys.list({ type }),
    queryFn: (params) => getRecipesApi(params, type),
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
        queryKey: recipeKeys.list({ type }),
      });
    };
  }, [queryClient, type]);

  return queryResult;
}
