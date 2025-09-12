import { type ReactNode, useRef } from "react";

import { useQuery } from "@tanstack/react-query";

import ButtonComponent from "@/components/button/button.component";
import DrawerComponent from "@/components/drawer/drawer.component";
import RecipeCardComponent from "@/components/recipe-card/recipe-card.component";
import TypographyComponent from "@/components/typography/typography.component";

import type { Recipe } from "@/entities/recipe.ts";

import { richFetch } from "@/utils/fetch.utils.ts";

import styles from "./home.module.css";

type GetRecentRecipesResponseDto = {
  items: Recipe[];
  currentPage: number;
  lastPage: number;
};

export default function HomePage(): ReactNode {
  const drawerRef = useRef<HTMLDialogElement>(null);

  const { data } = useQuery({
    queryKey: ["recipe"],
    queryFn: async () => {
      const data =
        await richFetch<GetRecentRecipesResponseDto>("/recipe/recent");

      if ("error" in data) {
        throw new Error(data.error);
      }

      return data.result;
    },
  });

  return (
    <div className={styles.home}>
      <DrawerComponent ref={drawerRef}>
        <TypographyComponent variant="h2">Add a filter</TypographyComponent>
      </DrawerComponent>
      <header>Header</header>
      <main>
        {data && (
          <>
            <RecipeCardComponent recipe={data.items[0]} />
            <RecipeCardComponent recipe={data.items[1]} />
          </>
        )}

        <ButtonComponent onClick={() => drawerRef.current?.showModal()}>
          Open Drawer
        </ButtonComponent>
      </main>
    </div>
  );
}
