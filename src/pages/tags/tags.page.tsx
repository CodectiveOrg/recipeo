import type { ReactNode } from "react";

import { Link } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { getAllTagsApi } from "@/api/tag/get-all-tags.api";

import BackButtonComponent from "@/components/back-button/back-button.component.tsx";
import ButtonComponent from "@/components/button/button.component";
import LoadingComponent from "@/components/loading/loading.component";
import TypographyComponent from "@/components/typography/typography.component";

import styles from "./tags.module.css";

export default function TagsPage(): ReactNode {
  const { data, isPending, isError } = useQuery({
    queryKey: ["tags"],
    queryFn: getAllTagsApi,
  });

  if (isPending) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <>Error...</>;
  }

  return (
    <div className={styles["tags"]}>
      <title>Tags</title>
      <header>
        <BackButtonComponent className={styles["back-button"]} />
        <TypographyComponent variant="h2" className={styles.title}>
          Tags
        </TypographyComponent>
      </header>
      <main>
        <ul>
          {data.map((tag) => (
            <li key={tag.id}>
              <ButtonComponent
                as={Link}
                to={`/search?tag=${tag.title}`}
                variant="solid"
                color="secondary"
                size="small"
              >
                {tag.title}
              </ButtonComponent>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
