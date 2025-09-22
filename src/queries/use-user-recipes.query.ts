import { useEffect } from "react";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import { getUserRecipesApi } from "@/api/recipe/get-user-recipes.api.ts";

import { type UserRecipesTab, recipeKeys } from "@/queries/keys.ts";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useUserRecipesQuery(
  tab: UserRecipesTab,
  userId: string | undefined,
) {
  const queryClient = useQueryClient();

  const queryResult = useInfiniteQuery({
    queryKey: recipeKeys.list({ type: "user", tab, userId }),
    queryFn: ({ pageParam }) => getUserRecipesApi({ pageParam }, tab, userId),
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
        queryKey: recipeKeys.list({ type: "user", tab, userId }),
      });
    };
  }, [queryClient, tab, userId]);

  return queryResult;
}
