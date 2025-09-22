import { type ReactNode } from "react";

import HeaderWithBackButtonComponent from "@/components/header-with-back-button/header-with-back-button.component.tsx";
import InfiniteRecipesComponent from "@/components/infinite-recipes/infinite-recipes.component.tsx";
import TitleComponent from "@/components/title/title.component.tsx";

import type { InfiniteRecipesType } from "@/queries/keys.ts";
import { useInfiniteRecipesQuery } from "@/queries/use-infinite-recipes.query.ts";

import styles from "./recipes.module.css";

type Props = {
  type: InfiniteRecipesType;
};

export default function RecipesPage({ type }: Props): ReactNode {
  const queryResult = useInfiniteRecipesQuery(type);

  let title;
  switch (type) {
    case "chosen":
      title = "Editor's Choice";
      break;
    case "popular":
      title = "Popular Recipes";
      break;
    case "recent":
      title = "Recent Recipes";
      break;
  }

  return (
    <div className={styles.chosen}>
      <TitleComponent>title</TitleComponent>
      <HeaderWithBackButtonComponent title={title} />
      <main>
        <InfiniteRecipesComponent queryResult={queryResult} />
      </main>
    </div>
  );
}
