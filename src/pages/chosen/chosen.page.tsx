import { type ReactNode } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";

import { getChosenRecipesApi } from "@/api/recipe/get-chosen-recipes.api.ts";

import HeaderWithBackButtonComponent from "@/components/header-with-back-button/header-with-back-button.component.tsx";
import InfiniteRecipesComponent from "@/components/infinite-recipes/infinite-recipes.component.tsx";
import TitleComponent from "@/components/title/title.component.tsx";

import { recipeKeys } from "@/queries/keys.ts";

import styles from "./chosen.module.css";

export default function ChosenPage(): ReactNode {
  const queryResult = useInfiniteQuery({
    queryKey: recipeKeys.list({ type: "chosen" }),
    queryFn: getChosenRecipesApi,
    getNextPageParam: (last) => {
      if (last.currentPage >= last.lastPage) {
        return null;
      }

      return last.currentPage + 1;
    },
    initialPageParam: 1,
  });

  return (
    <div className={styles.chosen}>
      <TitleComponent>Editor's Choice Recipes</TitleComponent>
      <HeaderWithBackButtonComponent title="Editor's Choice Recipes" />
      <main>
        <InfiniteRecipesComponent queryResult={queryResult} />
      </main>
    </div>
  );
}
