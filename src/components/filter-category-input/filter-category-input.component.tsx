import { type ComponentProps, type ReactNode, useId, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import clsx from "clsx";

import { getAllTagsApi } from "@/api/tag/get-all-tags.api";

import LoadingComponent from "@/components/loading/loading.component";

import { Tag } from "@/entities/tag";

import ButtonComponent from "../button/button.component";

import styles from "./filter-category-input.module.css";

type Props = Omit<
  ComponentProps<"input">,
  "type" | "value" | "defaultValue" | "onChange"
> & {
  label: string;
  value?: "All";
  defaultValue?: "All";
  onChange?: (value: Tag) => void;
};

export default function FilterCategoryInputComponent({
  className,
  label,
  value: controlledValue,
  defaultValue,
  onChange,
  ...otherProps
}: Props): ReactNode {
  const [uncontrolledValue, setUncontrolledValue] = useState<Tag>(
    defaultValue ?? "All",
  );
  const value = controlledValue ?? uncontrolledValue;

  const id = useId();

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

  const tags: Tag[] = [{ id: -1, title: "All" }, ...data];

  const handleButtonClick = (tag: Tag): void => {
    setUncontrolledValue(tag);
    onChange?.(tag);
  };

  return (
    <div className={clsx(styles["filter-category-component"], className)}>
      <label htmlFor={id}>{label}</label>
      <div className={styles.colors}>
        {tags.map((tag) => (
          <ButtonComponent
            key={tag.id}
            color={tag.title === value ? "primary" : "secondary"}
            onClick={() => handleButtonClick(tag.id)}
          >
            {tag.title}
          </ButtonComponent>
        ))}
      </div>
      <input id={id} type="hidden" value={value} {...otherProps} />
    </div>
  );
}
