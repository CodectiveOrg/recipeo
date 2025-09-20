import {
  type ChangeEvent,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import { useQuery } from "@tanstack/react-query";

import type { TagType } from "@/validation/schemas/tag.schema";

import { getAllTagsApi } from "@/api/tag/get-all-tags.api.ts";

import LoadingComponent from "@/components/loading/loading.component.tsx";
import SelectComponent from "@/components/select/select.component.tsx";

type Props = {
  presentational?: boolean;
  item: TagType;
  setItems: Dispatch<SetStateAction<TagType[]>>;
};

export default function TagInputComponent({
  item,
  setItems,
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

  const handleTagInputChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setItems((old) =>
      old.map((x) => {
        if (x.id !== item.id) {
          return x;
        }

        return { ...x, title: e.target.value };
      }),
    );
  };

  return (
    <SelectComponent onChange={handleTagInputChange}>
      {data.map((tag) => (
        <option key={tag.id} value={tag.title}>
          {tag.title}
        </option>
      ))}
    </SelectComponent>
  );
}
