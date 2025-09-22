import { useEffect } from "react";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import { getUserLikedRecipesApi } from "@/api/user/get-user-liked-recipes.api.ts";

import { recipeKeys } from "@/queries/keys.ts";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useUserLikedRecipesQuery(userId: string | undefined) {
  const queryClient = useQueryClient();

  const queryResult = useInfiniteQuery({
    queryKey: recipeKeys.list({ type: "user", tab: "liked", userId }),
    queryFn: ({ pageParam }) => getUserLikedRecipesApi({ userId, pageParam }),
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
        queryKey: recipeKeys.list({ type: "user", tab: "liked", userId }),
      });
    };
  }, [queryClient, userId]);

  return queryResult;
}
