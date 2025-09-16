import { type ComponentProps, type ReactNode, useId, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import clsx from "clsx";

import { getAllTagsApi } from "@/api/tag/get-all-tags.api";

import ButtonComponent from "@/components/button/button.component";
import LoadingComponent from "@/components/loading/loading.component";
import TypographyComponent from "@/components/typography/typography.component";

import { Tag } from "@/entities/tag";

import styles from "./tag-input.module.css";

type Props = Omit<
  ComponentProps<"input">,
  "type" | "value" | "defaultValue" | "onChange"
> & {
  label: string;
  value?: "All";
  defaultValue?: "All";
  onChange?: (value: Tag) => void;
};

export default function TagInputComponent({
  className,
  label,
  value: controlledValue,
  defaultValue,
  onChange,
  ...otherProps
}: Props): ReactNode {
  const [uncontrolledValue, setUncontrolledValue] = useState<string>(
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
    setUncontrolledValue(tag.title);
    onChange?.(tag);
  };

  return (
    <div className={clsx(styles["tag-input"], className)}>
      <label htmlFor={id}>
        <TypographyComponent as="span" variant="h2">
          {label}
        </TypographyComponent>
      </label>
      <div className={styles.buttons}>
        {tags.map((tag) => (
          <ButtonComponent
            key={tag.id}
            size="small"
            color={tag.title === value ? "primary" : "secondary"}
            onClick={() => handleButtonClick(tag)}
          >
            {tag.title}
          </ButtonComponent>
        ))}
      </div>
      <input id={id} type="hidden" value={value} {...otherProps} />
    </div>
  );
}
