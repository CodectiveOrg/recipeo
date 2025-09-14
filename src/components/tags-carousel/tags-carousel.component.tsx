import { type ReactNode } from "react";

import { Link } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { getAllTagsApi } from "@/api/tag/get-all-tags.api.ts";

import ButtonComponent from "@/components/button/button.component.tsx";
import CarouselComponent from "@/components/carousel/carousel.component.tsx";
import LoadingComponent from "@/components/loading/loading.component.tsx";

import type { Tag } from "@/entities/tag.ts";

export default function TagsCarouselComponent(): ReactNode {
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

  const tags: Tag[] = [{ id: -1, title: "All" }, ...data.slice(0, 5)];

  return (
    <CarouselComponent spaceBetween={16}>
      {tags.map((tag) => (
        <ButtonComponent
          key={tag.id}
          as={Link}
          to={`/tag/${tag.title}`}
          size="small"
          variant={tag.title === "All" ? "solid" : "outlined"}
        >
          {tag.title}
        </ButtonComponent>
      ))}
    </CarouselComponent>
  );
}
