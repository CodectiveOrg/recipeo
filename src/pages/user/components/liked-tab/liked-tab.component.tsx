import type { ReactNode } from "react";

import { useParams } from "react-router";

import InfiniteRecipesComponent from "@/components/infinite-recipes/infinite-recipes.component.tsx";

import { useUserLikedRecipesQuery } from "@/queries/use-user-liked-recipes.query.ts";

export default function LikedTabComponent(): ReactNode {
  const { userId } = useParams();

  const queryResult = useUserLikedRecipesQuery(userId);

  return (
    <InfiniteRecipesComponent queryResult={queryResult} columnsCount={2} />
  );
}
