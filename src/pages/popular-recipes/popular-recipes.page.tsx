import { Fragment, type ReactNode } from "react";

import { useNavigate } from "react-router";

import { useInfiniteQuery } from "@tanstack/react-query";

import { useInView } from "react-intersection-observer";

import { getPopularRecipesApi } from "@/api/public/get-popular-recipes.api";

import IconComponent from "@/components/icon-button/icon-button.component";
import IconButtonComponent from "@/components/icon-button/icon-button.component";
import LoadingComponent from "@/components/loading/loading.component";
import RecipeCardComponent from "@/components/recipe-card/recipe-card.component";
import TypographyComponent from "@/components/typography/typography.component";

import styles from "./popular-recipes.module.css";

export default function PopularRecipesPage(): ReactNode {
  const {
    isPending,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["recipes", "popular"],
    queryFn: getPopularRecipesApi,
    getNextPageParam: (last) => {
      if (last.currentPage >= last.lastPage) {
        return null;
      }

      return last.currentPage + 1;
    },
    initialPageParam: 1,
  });

  const { ref } = useInView({
    onChange: async (inView) => {
      if (inView && !isFetchingNextPage && hasNextPage) {
        await fetchNextPage();
      }
    },
  });

  const navigate = useNavigate();

  if (isPending) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <>Error...</>;
  }

  return (
    <div className={styles["popular-recipes"]}>
      <header>
        <IconButtonComponent
          className={styles["back-button"]}
          onClick={() => navigate(-1)}
        >
          <IconComponent name="alt-arrow-left-linear" />
        </IconButtonComponent>
        <TypographyComponent variant="h2" className={styles.title}>
          Popular Recipes
        </TypographyComponent>
      </header>
      <main>
        <ul>
          {data.pages.map((page, pageIndex) => (
            <Fragment key={page.currentPage}>
              {page.items.map((recipe, recipeIndex) => (
                <li
                  key={recipe.id}
                  ref={
                    hasNextPage &&
                    pageIndex === data.pages.length - 1 &&
                    recipeIndex === page.items.length - 1
                      ? ref
                      : undefined
                  }
                >
                  <RecipeCardComponent recipe={recipe} />
                </li>
              ))}
            </Fragment>
          ))}
        </ul>
        {isFetchingNextPage && (
          <TypographyComponent as="p" variant="s" color="text-secondary">
            Loading...
          </TypographyComponent>
        )}
        {!hasNextPage && (
          <TypographyComponent as="p" variant="s" color="text-secondary">
            All done!
          </TypographyComponent>
        )}
      </main>
    </div>
  );
}
