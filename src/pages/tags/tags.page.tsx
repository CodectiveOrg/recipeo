import type { ReactNode } from "react";

import { Link } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { getAllTagsApi } from "@/api/tag/get-all-tags.api";

import ButtonComponent from "@/components/button/button.component";
import IconComponent from "@/components/icon/icon.component";
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

  const clone = [{ id: -1, title: "All" }, ...data];

  return (
    <div className={styles["tags"]}>
      <header>
        <Link to="/">
          <IconComponent name="alt-arrow-left-linear" />
        </Link>
        <TypographyComponent variant="h2">Tags</TypographyComponent>
      </header>
      <main>
        <ul>
          {clone.map((tag) => (
            <li key={tag.id}>
              <ButtonComponent
                as={Link}
                to={`/tag/${tag.title}`}
                size="small"
                variant={tag.title === "All" ? "solid" : "outlined"}
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
