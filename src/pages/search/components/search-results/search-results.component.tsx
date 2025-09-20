import { type ReactNode } from "react";

import { useQuery } from "@tanstack/react-query";

import { searchRecipesApi } from "@/api/recipe/search-recipes.api.ts";

import LoadingComponent from "@/components/loading/loading.component.tsx";
import RecipeCardComponent from "@/components/recipe-card/recipe-card.component.tsx";

import HandfulSection from "@/sections/handful/handful.section.tsx";

type Props = {
  queryString: string;
};

export default function SearchResultsComponent({
  queryString,
}: Props): ReactNode {
  const { data, isPending, isError } = useQuery({
    queryKey: ["recipes", "search", queryString],
    queryFn: () => searchRecipesApi(queryString),
  });

  if (isPending) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <>Error...</>;
  }

  return (
    <HandfulSection title="Search Results">
      <ul>
        {data.map((recipe) => (
          <RecipeCardComponent key={recipe.id} recipe={recipe} />
        ))}
      </ul>
    </HandfulSection>
  );
}
