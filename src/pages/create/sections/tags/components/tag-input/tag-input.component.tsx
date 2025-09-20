import { type ReactNode } from "react";

import { useQuery } from "@tanstack/react-query";

import { Controller, useFormContext } from "react-hook-form";

import type { RecipeType } from "@/validation/schemas/recipe.schema.ts";

import { getAllTagsApi } from "@/api/tag/get-all-tags.api.ts";

import LoadingComponent from "@/components/loading/loading.component.tsx";
import SelectComponent from "@/components/select/select.component.tsx";

type Props = {
  index: number;
};

export default function TagInputComponent({ index }: Props): ReactNode {
  const { control } = useFormContext<RecipeType>();

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

  return (
    <Controller
      name={`tags.${index}.title`}
      control={control}
      render={({ field }) => (
        <SelectComponent {...field}>
          {data.map((tag) => (
            <option key={tag.id} value={tag.title}>
              {tag.title}
            </option>
          ))}
        </SelectComponent>
      )}
    />
  );
}
