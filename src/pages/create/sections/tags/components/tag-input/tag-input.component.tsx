import { type ReactNode, use } from "react";

import {
  Controller,
  useFormContext,
  useFormState,
  useWatch,
} from "react-hook-form";

import type { RecipeType } from "@/validation/schemas/recipe.schema.ts";

import SelectComponent from "@/components/select/select.component.tsx";

import RecipeFormErrorComponent from "@/pages/create/components/recipe-form-error/recipe-form-error.component.tsx";
import { DataContext } from "@/pages/create/context/data.context.ts";

type Props = {
  index: number;
};

export default function TagInputComponent({ index }: Props): ReactNode {
  const { allTags } = use(DataContext);

  const { control } = useFormContext<RecipeType>();
  const { errors, isSubmitted } = useFormState({ control });

  const titleErrorMessage = errors.tags?.[index]?.title?.message;

  const { tags: usedTags } = useWatch<RecipeType>();
  const usedTitles = new Set(usedTags!.map((tag) => tag.title));

  const availableTags = allTags.filter(
    (tag) => !usedTitles.has(tag.title) || usedTags![index].title === tag.title,
  );

  return (
    <>
      <Controller
        name={`tags.${index}.title`}
        control={control}
        render={({ field }) => {
          return (
            <SelectComponent
              state={
                titleErrorMessage ? "error" : isSubmitted ? "success" : "idle"
              }
              {...field}
            >
              {availableTags.map((tag) => (
                <option key={tag.id} value={tag.title}>
                  {tag.title}
                </option>
              ))}
            </SelectComponent>
          );
        }}
      />
      <RecipeFormErrorComponent message={titleErrorMessage} />
    </>
  );
}
