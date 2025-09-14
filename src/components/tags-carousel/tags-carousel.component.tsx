import { type ReactNode, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { getAllTagsApi } from "@/api/tag/get-all-tags.api.ts";

import ButtonComponent from "@/components/button/button.component.tsx";
import CarouselComponent from "@/components/carousel/carousel.component.tsx";

export default function TagsCarouselComponent(): ReactNode {
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const { data } = useQuery({
    queryKey: ["tags-section"],
    queryFn: getAllTagsApi,
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
    <CarouselComponent>
      <ButtonComponent
        size="small"
        variant={isSelected(-1) ? "solid" : "outlined"}
        onClick={() => handleButtonToggleSelection(-1)}
      >
        All
      </ButtonComponent>
      {content}
    </CarouselComponent>
  );
}
