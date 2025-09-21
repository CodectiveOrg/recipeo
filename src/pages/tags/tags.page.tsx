import type { ReactNode } from "react";

import { Link } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { getAllTagsApi } from "@/api/tag/get-all-tags.api";

import ButtonComponent from "@/components/button/button.component";
import HeaderWithBackButtonComponent from "@/components/header-with-back-button/header-with-back-button.component.tsx";
import LoadingComponent from "@/components/loading/loading.component";
import TitleComponent from "@/components/title/title.component.tsx";

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
      <TitleComponent>Tags</TitleComponent>
      <HeaderWithBackButtonComponent title="Tags" />
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
