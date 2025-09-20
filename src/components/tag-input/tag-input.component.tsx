import { type ComponentProps, type ReactNode } from "react";

import { useQuery } from "@tanstack/react-query";

import clsx from "clsx";

import { getAllTagsApi } from "@/api/tag/get-all-tags.api";

import LoadingComponent from "@/components/loading/loading.component";
import SelectComponent from "@/components/select/select.component.tsx";
import TypographyComponent from "@/components/typography/typography.component";

import { tagFilter } from "@/configs/search-filters.config.ts";

import { Tag } from "@/entities/tag";

import styles from "./tag-input.module.css";

type Props = ComponentProps<typeof SelectComponent> & {
  label: string;
};

export default function TagInputComponent({
  className,
  label,
  ...otherProps
}: Props): ReactNode {
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

  const tags: Tag[] = [{ id: -1, title: tagFilter.defaultValue }, ...data];

  return (
    <label className={clsx(styles["tag-input"], className)}>
      <TypographyComponent as="span" variant="h2">
        {label}
      </TypographyComponent>
      <SelectComponent {...otherProps}>
        {tags.map((tag) => (
          <option key={tag.id} value={tag.title}>
            {tag.title}
          </option>
        ))}
      </SelectComponent>
    </label>
  );
}
