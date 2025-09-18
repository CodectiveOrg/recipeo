import { type ReactNode, useRef } from "react";

import { parseAsString, useQueryStates } from "nuqs";

import { useMutation, useQuery } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useSearchHistoryStore } from "@/stores/search-history.store";

import { getChosenRecipesApi } from "@/api/recipe/get-chosen-recipes.api";
import { getPopularRecipesApi } from "@/api/recipe/get-popular-recipes.api";
import { searchRecipesApi } from "@/api/recipe/search-recipes.api";

import BackButtonComponent from "@/components/back-button/back-button.component";
import ChosenRecipesComponent from "@/components/chosen-recipes/chosen-recipes.component";
import FiltersDrawerComponent from "@/components/filters-drawer/filters-drawer.component";
import LoadingComponent from "@/components/loading/loading.component";
import RecipeCardComponent from "@/components/recipe-card/recipe-card.component";
import RecipesCarouselComponent from "@/components/recipes-carousel/recipes-carousel.component";
import SearchHistoryComponent from "@/components/search-history/search-history.componet";
import SearchInputComponent from "@/components/search-input/search-input.component";
import TypographyComponent from "@/components/typography/typography.component";

import HandfulSection from "@/sections/handful/handful.section";

import FilterButtonComponent from "./components/filter-button/filter-button.component";

import styles from "./search.module.css";

const QuerySchema = z.object({
  query: z.coerce.string<string>(),
});

type Values = z.infer<typeof QuerySchema>;

export default function SearchPage(): ReactNode {
  const [values, setValues] = useQueryStates({
    query: parseAsString.withDefault(""),
  });

  const filterDrawerRef = useRef<HTMLDialogElement | null>(null);

  const add = useSearchHistoryStore((state) => state.add);

  const { data, mutateAsync, isPending, isError } = useMutation({
    mutationKey: ["recipes", "search"],
    mutationFn: searchRecipesApi,
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const popularRecipesQueryResult = useQuery({
    queryKey: ["recipes", "popular", 1],
    queryFn: () => getPopularRecipesApi({ pageParam: 1 }),
  });

  const chosenRecipesQueryResult = useQuery({
    queryKey: ["recipes", "chosen", 1],
    queryFn: () => getChosenRecipesApi({ pageParam: 1 }),
  });

  const handleFormSubmit = async (values: Values): Promise<void> => {
    await setValues(values);

    add({ query: values.query });

    await mutateAsync({
      query: values.query,
    });
  };

  const { register, handleSubmit } = useForm<Values>({
    values,
    resolver: zodResolver(QuerySchema),
  });

  let searchResult;
  if (isPending) {
    searchResult = <LoadingComponent />;
  }

  if (isError) {
    searchResult = <>Error...</>;
  }

  if (data) {
    searchResult = data.map((recipe) => (
      <RecipeCardComponent
        key={recipe.id}
        recipe={recipe}
      ></RecipeCardComponent>
    ));
  }

  return (
    <div className={styles.search}>
      <header>
        <BackButtonComponent />
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <SearchInputComponent {...register("query")} />
        </form>
        <FilterButtonComponent ref={filterDrawerRef}></FilterButtonComponent>
      </header>
      <main>
        <FiltersDrawerComponent ref={filterDrawerRef}></FiltersDrawerComponent>
        <SearchHistoryComponent />
        <HandfulSection title="Popular Recipes" viewAllHref="/popular">
          <RecipesCarouselComponent queryResult={popularRecipesQueryResult} />
        </HandfulSection>
        <HandfulSection title="Editor's Choice" viewAllHref="/chosen">
          <ChosenRecipesComponent queryResult={chosenRecipesQueryResult} />
        </HandfulSection>
        <TypographyComponent as="h2" variant="h2">
          Search Result
        </TypographyComponent>
        {searchResult}
      </main>
    </div>
  );
}
