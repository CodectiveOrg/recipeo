import { useEffect } from "react";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import { getUserRecipesApi } from "@/api/user/get-user-recipes.api.ts";

import { recipeKeys } from "@/queries/keys.ts";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useUserRecipesQuery(userId: string | undefined) {
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

  return queryResult;
}
