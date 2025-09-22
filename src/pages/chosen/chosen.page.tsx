import { type ReactNode } from "react";

import HeaderWithBackButtonComponent from "@/components/header-with-back-button/header-with-back-button.component.tsx";
import InfiniteRecipesComponent from "@/components/infinite-recipes/infinite-recipes.component.tsx";
import TitleComponent from "@/components/title/title.component.tsx";

import { useInfiniteRecipesQuery } from "@/queries/use-infinite-recipes.query.ts";

import styles from "./chosen.module.css";

export default function ChosenPage(): ReactNode {
  const queryResult = useInfiniteRecipesQuery("chosen");

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
