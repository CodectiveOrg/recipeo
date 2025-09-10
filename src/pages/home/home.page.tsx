import { type ReactNode } from "react";

import { useQuery } from "@tanstack/react-query";

import PopularRecipesSection from "@/sections/popular-recipes/popular-recipes.section";

import RecipeCardComponent from "@/components/recipe-card/recipe-card.component";

import type { Recipe } from "@/entities/recipe.ts";

import { richFetch } from "@/utils/fetch.utils.ts";

import styles from "./home.module.css";

export default function HomePage(): ReactNode {
  const { data } = useQuery({
    queryKey: ["recipe"],
    queryFn: async () => {
      const data = await richFetch<Recipe[]>("/recipe/recent");

      if ("error" in data) {
        throw new Error(data.error);
      }

      return data.result;
    },
  });

  return (
    <div className={styles.home}>
      <header>Header</header>
      <main>
        <br />
        <PopularRecipesSection />
        <br />
        <PopularRecipesSection size="small" />
        <br />
        <br />
        {data && (
          <>
            <RecipeCardComponent recipe={data[0]} />
            <RecipeCardComponent recipe={data[1]} />
            <RecipeCardComponent recipe={data[2]} />
          </>
        )}
      </main>
    </div>
  );
}
