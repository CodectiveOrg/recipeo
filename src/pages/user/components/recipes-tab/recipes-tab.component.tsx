import { type ReactNode } from "react";

import { useParams } from "react-router";

import InfiniteRecipesComponent from "@/components/infinite-recipes/infinite-recipes.component.tsx";

import { useUserRecipesQuery } from "@/queries/use-user-recipes.query.ts";

export default function RecipesTabComponent(): ReactNode {
  const { userId } = useParams();

  const queryResult = useUserRecipesQuery(userId);

  return (
    <InfiniteRecipesComponent queryResult={queryResult} columnsCount={2} />
  );
}
