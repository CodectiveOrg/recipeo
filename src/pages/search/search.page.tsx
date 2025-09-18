import {
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
  useRef,
} from "react";

import { useSearchParams } from "react-router";

import { parseAsString, useQueryStates } from "nuqs";

import { useMutation, useQuery } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { useSearchHistoryStore } from "@/stores/search-history.store";

import { getChosenRecipesApi } from "@/api/recipe/get-chosen-recipes.api";
import { getPopularRecipesApi } from "@/api/recipe/get-popular-recipes.api";
import { searchRecipesApi } from "@/api/recipe/search-recipes.api";

import BackButtonComponent from "@/components/back-button/back-button.component";
import ChosenRecipesComponent from "@/components/chosen-recipes/chosen-recipes.component";
import FiltersDrawerComponent from "@/components/filters-drawer/filters-drawer.component";
import RecipeCardComponent from "@/components/recipe-card/recipe-card.component";
import RecipesCarouselComponent from "@/components/recipes-carousel/recipes-carousel.component";
import SearchHistoryComponent from "@/components/search-history/search-history.componet";
import SearchInputComponent from "@/components/search-input/search-input.component";
import TypographyComponent from "@/components/typography/typography.component";

import HandfulSection from "@/sections/handful/handful.section";

import FilterButtonComponent from "./components/filter-button/filter-button.component";

import styles from "./search.module.css";

export default function SearchPage(): ReactNode {
  const [query, setQuery] = useQueryStates({
    query: parseAsString,
  });

  const queryRef = useRef<HTMLInputElement | null>(null);

  const filterDrawerRef = useRef<HTMLDialogElement | null>(null);

  const [searchParams] = useSearchParams();

  const add = useSearchHistoryStore((state) => state.add);

  const { mutateAsync } = useMutation({
    mutationKey: ["recipes", "search"],
    mutationFn: searchRecipesApi,
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleSearchInputKeyDown = async (
    e: KeyboardEvent<HTMLInputElement>,
  ): Promise<void> => {
    if (e.key === "Enter") {
      if (!queryRef.current) {
        return;
      }

      add({ query: queryRef.current.value });

      await setQuery(query);

      await mutateAsync({
        query: queryRef.current.value,
        tag: searchParams.get("tag")!,
        maxDuration: +searchParams.get("maxDuration")!,
      });
    }
  };

  const { data } = useQuery({
    queryKey: ["recipes", queryRef.current?.value],
    queryFn: () => searchRecipesApi({ query: queryRef.current?.value }),
  });

  const popularRecipesQueryResult = useQuery({
    queryKey: ["recipes", "popular", 1],
    queryFn: () => getPopularRecipesApi({ pageParam: 1 }),
  });

  const chosenRecipesQueryResult = useQuery({
    queryKey: ["recipes", "chosen", 1],
    queryFn: () => getChosenRecipesApi({ pageParam: 1 }),
  });

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    console.log(formData);

    e.preventDefault();
    e.stopPropagation();

    add({ query: queryRef.current?.value });
    await mutateAsync({ query: queryRef.current?.value });
  };

  return (
    <div className={styles.search}>
      <header>
        <BackButtonComponent />
        <form onSubmit={handleFormSubmit}>
          <SearchInputComponent
            onKeyDown={handleSearchInputKeyDown}
            ref={queryRef}
          />
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
        {data &&
          data.map((recipe) => (
            <RecipeCardComponent
              key={recipe.id}
              recipe={recipe}
            ></RecipeCardComponent>
          ))}
      </main>
    </div>
  );
}
