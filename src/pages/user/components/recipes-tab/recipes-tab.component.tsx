import type { ReactNode } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";

import { UserRecipesApi } from "@/api/user/user-recipes.api";

import InfiniteRecipesComponent from "@/components/infinite-recipes/infinite-recipes.component.tsx";
import RecipeCardComponent from "@/components/recipe-card/recipe-card.component";

import type { Recipe } from "@/entities/recipe";

import styles from "./recipes-tab.module.css";

type Props = {
  userId: number;
};

export default function RecipesTabComponent({ userId }: Props): ReactNode {
  const queryResult = useInfiniteQuery({
    queryKey: ["user", "recipes", userId],
    queryFn: () => UserRecipesApi({ userId: userId }),
    getNextPageParam: (last) => {
      if (last.currentPage >= last.lastPage) {
        return null;
      }

      return last.currentPage + 1;
    },
    initialPageParam: 1,
  });

  return (
    <InfiniteRecipesComponent queryResult={queryResult}>
      <div className={styles.recipes}>
        {data.map((recipe: Recipe) => (
          <RecipeCardComponent recipe={recipe} key={recipe.id} />
        ))}
      </div>
    </InfiniteRecipesComponent>
  );
}
