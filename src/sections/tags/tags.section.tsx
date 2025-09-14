import { type ReactNode, useState } from "react";

import { Link } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { getTagsApi } from "@/api/recipe/get-tags.api";

import ButtonComponent from "@/components/button/button.component";
import CarouselComponent from "@/components/carousel/carousel.component";
import TypographyComponent from "@/components/typography/typography.component";

import styles from "./tags.module.css";

export default function TagsSection(): ReactNode {
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const { data } = useQuery({
    queryKey: ["tags-section"],
    queryFn: getTagsApi,
  });

  const isSelected = (tagId: number): boolean => {
    const index = selectedTags.findIndex((id) => id === tagId);
    return index >= 0 ? true : false;
  };

  const handleButtonToggleSelection = (tagId: number): void => {
    const index = selectedTags.findIndex((id) => id === tagId);

    if (index >= 0) {
      setSelectedTags((old) => old.filter((id) => id !== tagId));
    } else {
      setSelectedTags((old) => [...old, tagId]);
    }
  };

  const content = data
    ? data.map((tag) => (
        <ButtonComponent
          key={tag.id}
          size="small"
          variant={isSelected(tag.id) ? "solid" : "outlined"}
          onClick={() => handleButtonToggleSelection(tag.id)}
        >
          {tag.title}
        </ButtonComponent>
      ))
    : [];
  return (
    <div className={styles["tags-section"]}>
      <header>
        <TypographyComponent variant="p2">Tags</TypographyComponent>
        <TypographyComponent variant="p2">
          <Link to="#">See All</Link>
        </TypographyComponent>
      </header>

      <CarouselComponent slideBlockSize="4rem" slideInlineSize="10rem">
        <ButtonComponent
          size="small"
          variant={isSelected(-1) ? "solid" : "outlined"}
          onClick={() => handleButtonToggleSelection(-1)}
        >
          All
        </ButtonComponent>
        {content}
      </CarouselComponent>
    </div>
  );
}
