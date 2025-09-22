import { type ReactNode } from "react";

import { Link } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { getAllTagsApi } from "@/api/tag/get-all-tags.api.ts";

import ButtonComponent, {
  ButtonSkeleton,
} from "@/components/button/button.component.tsx";
import CarouselComponent from "@/components/carousel/carousel.component.tsx";

import { tagFilter } from "@/configs/search-filters.config.ts";

import type { Tag } from "@/entities/tag.ts";

export default function TagsCarouselComponent(): ReactNode {
  const { data, isPending, isError } = useQuery({
    queryKey: ["tags"],
    queryFn: getAllTagsApi,
  });

  if (isPending) {
    return <TagsCarouselSkeleton />;
  }

  if (isError) {
    return <>Error...</>;
  }

  const tags: Tag[] = [
    { id: -1, title: tagFilter.defaultValue },
    ...data.slice(0, 5),
  ];

  return (
    <CarouselComponent spaceBetween={16}>
      {tags.map((tag) => (
        <ButtonComponent
          key={tag.id}
          as={Link}
          to={`/search?tag=${tag.title}`}
          size="small"
          variant={tag.title === tagFilter.label ? "solid" : "outlined"}
        >
          {tag.title}
        </ButtonComponent>
      ))}
    </CarouselComponent>
  );
}

function TagsCarouselSkeleton(): ReactNode {
  const tags = [
    { id: -1, inlineSize: 80 },
    { id: -2, inlineSize: 140 },
    { id: -3, inlineSize: 100 },
    { id: -4, inlineSize: 80 },
    { id: -5, inlineSize: 120 },
  ];

  return (
    <CarouselComponent spaceBetween={16}>
      {tags.map((tag) => (
        <ButtonSkeleton
          key={tag.id}
          size="small"
          variant="text"
          style={{ minInlineSize: tag.inlineSize }}
        />
      ))}
    </CarouselComponent>
  );
}
