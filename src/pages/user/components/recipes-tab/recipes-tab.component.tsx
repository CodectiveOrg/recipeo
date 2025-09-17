import { type ReactNode } from "react";

import { useParams } from "react-router";

import { useInfiniteQuery } from "@tanstack/react-query";

import { getUserRecipesApi } from "@/api/user/get-user-recipes.api.ts";

import InfiniteRecipesComponent from "@/components/infinite-recipes/infinite-recipes.component.tsx";

export default function RecipesTabComponent(): ReactNode {
  const { userId } = useParams();

  const queryResult = useInfiniteQuery({
    queryKey: ["user", "all-tab", "recipes", userId],
    queryFn: ({ pageParam }) => getUserRecipesApi({ userId, pageParam }),
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
