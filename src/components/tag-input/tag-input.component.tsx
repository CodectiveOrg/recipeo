import {
  type ChangeEvent,
  type ComponentProps,
  type ReactNode,
  useId,
  useState,
} from "react";

import { useQuery } from "@tanstack/react-query";

import clsx from "clsx";

import { getAllTagsApi } from "@/api/tag/get-all-tags.api";

import LoadingComponent from "@/components/loading/loading.component";
import TypographyComponent from "@/components/typography/typography.component";

import { Tag } from "@/entities/tag";

import styles from "./tag-input.module.css";

type Props = Omit<
  ComponentProps<"input">,
  "type" | "value" | "defaultValue" | "onChange"
> & {
  label: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
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
    defaultValue ?? "all",
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

  const tags: Tag[] = [{ id: -1, title: "all" }, ...data];

  const handleChangeTag = (e: ChangeEvent<HTMLSelectElement>): void => {
    setUncontrolledValue(e.currentTarget.value);
    onChange?.(e.currentTarget.value);
  };

  return (
    <div className={clsx(styles["tag-input"], className)}>
      <label htmlFor={id}>
        <TypographyComponent as="span" variant="h2">
          {label}
        </TypographyComponent>
      </label>
      <select name="tag" id={id} onChange={handleChangeTag}>
        {tags.map((tag) => (
          <option key={tag.id} value={tag.title} selected={tag.title === value}>
            {tag.title}
          </option>
        ))}
      </select>
      <input id={id} type="hidden" value={value} {...otherProps} />
    </div>
  );
}
