import type { ReactNode } from "react";
import { useEffect } from "react";

import { useParams } from "react-router";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import { getUserLikedRecipesApi } from "@/api/user/get-user-liked-recipes.api.ts";

import InfiniteRecipesComponent from "@/components/infinite-recipes/infinite-recipes.component.tsx";

import { recipeKeys } from "@/queries/keys.ts";

export default function LikedTabComponent(): ReactNode {
  const { userId } = useParams();
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

  return (
    <InfiniteRecipesComponent queryResult={queryResult} columnsCount={2} />
  );
}
