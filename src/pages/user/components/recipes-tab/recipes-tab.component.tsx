import { type ReactNode } from "react";

import { useParams } from "react-router";

import InfiniteRecipesComponent from "@/components/infinite-recipes/infinite-recipes.component.tsx";

import type { UserRecipesTab } from "@/queries/keys.ts";
import { useUserRecipesQuery } from "@/queries/use-user-recipes.query.ts";

type Props = {
  tab: UserRecipesTab;
};

export default function RecipesTabComponent({ tab }: Props): ReactNode {
  const { userId } = useParams();

  const queryResult = useUserRecipesQuery(tab, userId);

  return (
    <InfiniteRecipesComponent queryResult={queryResult} columnsCount={2} />
  );
}
