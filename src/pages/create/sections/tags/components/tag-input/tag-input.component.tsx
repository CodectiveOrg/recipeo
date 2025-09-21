import { type ReactNode, use } from "react";

import { Controller, useFormContext, useFormState } from "react-hook-form";

import type { RecipeType } from "@/validation/schemas/recipe/recipe.schema.ts";

import ErrorMessageComponent from "@/components/error-message/error-message.component.tsx";
import SelectComponent from "@/components/select/select.component.tsx";

import { DataContext } from "@/pages/create/context/data.context.ts";

type Props = {
  index: number;
};

export default function TagInputComponent({ index }: Props): ReactNode {
  const { allTags } = use(DataContext);

  const { control } = useFormContext<RecipeType>();
  const { errors, isSubmitted } = useFormState<RecipeType>({ control });

  const titleErrorMessage = errors.tags?.[index]?.title?.message;

  return (
    <>
      <Controller
        name={`tags.${index}.title`}
        control={control}
        render={({ field }) => (
          <SelectComponent
            state={
              titleErrorMessage ? "error" : isSubmitted ? "success" : "idle"
            }
            {...field}
          >
            {allTags.map((tag) => (
              <option key={tag.id} value={tag.title}>
                {tag.title}
              </option>
            ))}
          </SelectComponent>
        )}
      />
      <ErrorMessageComponent message={titleErrorMessage} />
    </>
  );
}
