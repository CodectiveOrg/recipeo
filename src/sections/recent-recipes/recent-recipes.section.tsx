import { Fragment, type ReactNode, useEffect, useRef } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";

import TypographyComponent from "@/components/typography/typography.component.tsx";

import type { Recipe } from "@/entities/recipe";

import styles from "./recent-recipes.module.css";

const recipes: Recipe[] = [
  {
    id: 1,
    title: "Asian white noodle with extra seafood",
    description: "Lorem ipsum dolor sit amet.",
    duration: 20,
    tags: [],
    ingredients: [],
    steps: [],
    user: { username: "James Spader", picture: "" },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: "Asian white noodle with extra seafood",
    description: "Lorem ipsum dolor sit amet.",
    duration: 20,
    tags: [],
    ingredients: [],
    steps: [],
    user: { username: "James Spader", picture: "" },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    title: "Asian white noodle with extra seafood",
    description: "Lorem ipsum dolor sit amet.",
    duration: 20,
    tags: [],
    ingredients: [],
    steps: [],
    user: { username: "James Spader", picture: "" },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    title: "Asian white noodle with extra seafood",
    description: "Lorem ipsum dolor sit amet.",
    duration: 20,
    tags: [],
    ingredients: [],
    steps: [],
    user: { username: "James Spader", picture: "" },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    title: "Asian white noodle with extra seafood",
    description: "Lorem ipsum dolor sit amet.",
    duration: 20,
    tags: [],
    ingredients: [],
    steps: [],
    user: { username: "James Spader", picture: "" },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    title: "Asian white noodle with extra seafood",
    description: "Lorem ipsum dolor sit amet.",
    duration: 20,
    tags: [],
    ingredients: [],
    steps: [],
    user: { username: "James Spader", picture: "" },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function RecentRecipesSection(): ReactNode {
  // const { data: recipes } = useQuery({
  //   queryKey: ["recent-recipes"],
  //   queryFn: getRecentRecipesApi,
  // });

  const PAGE_SIZE = 2;

  const fetchRecipes = async ({ pageParam = 0 }) => {
    const start = pageParam;
    const end = start + PAGE_SIZE;
    const data = recipes.slice(start, end);
    const nextCursor = end < recipes.length ? end : null;

    return { data, nextCursor };
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["recent-recipes"],
      queryFn: fetchRecipes,
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      initialPageParam: 0,
    });

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (!container || isFetchingNextPage || !hasNextPage) return;

      const { scrollTop, scrollHeight, clientHeight } = container;

      if (scrollHeight - scrollTop - clientHeight < 100) {
        fetchNextPage();
      }
    };

    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (el) {
        el.removeEventListener("scroll", handleScroll);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (status === "pending") {
    return <>Loading...</>;
  }

  if (status === "error") {
    return <>Error...</>;
  }

  return (
    <div className={styles["recent-recipes"]}>
      <TypographyComponent as="h2" variant="h2">
        Recent Recipes
      </TypographyComponent>
      <ul>
        {/* {data.pages.map((recipes, index) => (
        <Fragment key={index}>
          {recipes.data.map((recipe) => (
            <li key={recipe.id}>
               <TypographyComponent as="span" variant="p2">
              {recipe.title}
            </TypographyComponent>
            </li>
          ))}
        </Fragment>
      ))} */}
      </ul>
      <br />
      <div
        ref={scrollContainerRef}
        style={{
          height: "100px",
          overflowY: "auto",
          border: "1px solid #ccc",
        }}
      >
        {data.pages.map((page, i) => (
          <Fragment key={i}>
            {page?.data.map((recipe) => (
              <p
                style={{
                  height: "100px",
                  border: "1px solid #ce5353ff",
                }}
                key={recipe.id}
              >
                {recipe.title}
              </p>
            ))}
          </Fragment>
        ))}

        {isFetchingNextPage && <p>Loading more...</p>}
        {!hasNextPage && <p>No more recipes</p>}
      </div>
      <br />
      <ul>
        {/* {data.pages.map((recipes, index) => (
                <Fragment key={index}>
                  {recipes.data.map((recipe:Recipe) => (
                    <li key={recipe.id}>
                       <TypographyComponent as="span" variant="p2">
                      {recipe.title}
                    </TypographyComponent>
                    </li>
                  ))}
                </Fragment>
              ))} */}
      </ul>
      {/* <RecentRecipesSection recipes={recipes || []} status={status}/> */}
      <br />
    </div>
  );
}
