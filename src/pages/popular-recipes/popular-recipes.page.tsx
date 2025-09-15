import { Fragment, type ReactNode } from "react";

import { Link } from "react-router";

import { useInfiniteQuery } from "@tanstack/react-query";

import { useInView } from "react-intersection-observer";

import { getPopularRecipesApi } from "@/api/public/get-popular-recipes.api";

import IconComponent from "@/components/icon-button/icon-button.component";
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

  console.log(data?.pageParams);
  console.log(data?.pages);

  if (isPending) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <>Error...</>;
  }

  return (
    <div className={styles["popular-recipes"]}>
      <header>
        <Link to="/">
          <IconComponent name="alt-arrow-left-linear" />
        </Link>
        <TypographyComponent variant="h2">Popular Recipes</TypographyComponent>
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
