import type { ReactNode } from "react";

import { useParams } from "react-router";

import { useInfiniteQuery } from "@tanstack/react-query";

import { userLikedRecipesApi } from "@/api/user/user-liked-recipes.api.ts";

import InfiniteRecipesComponent from "@/components/infinite-recipes/infinite-recipes.component.tsx";

export default function LikedTabComponent(): ReactNode {
  const { userId } = useParams();

  const queryResult = useInfiniteQuery({
    queryKey: ["user", "liked-tab", "recipes", userId],
    queryFn: ({ pageParam }) => userLikedRecipesApi({ userId, pageParam }),
    getNextPageParam: (last) => {
      if (last.currentPage >= last.lastPage) {
        return null;
      }

      return last.currentPage + 1;
    },
    initialPageParam: 1,
  });

  return (
    <InfiniteRecipesComponent queryResult={queryResult} columnsCount={2} />
  );
}
