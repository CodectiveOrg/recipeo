import { type ReactNode } from "react";

import { Controller, useFormContext, useFormState } from "react-hook-form";

import type { RecipeType } from "@/validation/schemas/recipe/recipe.schema.ts";

import ErrorMessageComponent from "@/components/error-message/error-message.component.tsx";
import TextInputComponent from "@/components/text-input/text-input.component.tsx";

type Props = {
  index: number;
};

export default function IngredientInputComponent({ index }: Props): ReactNode {
  const { control } = useFormContext<RecipeType>();
  const { errors, isSubmitted } = useFormState<RecipeType>({ control });

  const titleErrorMessage = errors.ingredients?.[index]?.title?.message;

  return (
    <>
      <Controller
        name={`ingredients.${index}.title`}
        control={control}
        render={({ field }) => (
          <TextInputComponent
            type="text"
            placeholder={`Ingredient...`}
            state={
              titleErrorMessage ? "error" : isSubmitted ? "success" : "idle"
            }
            {...field}
          />
        )}
      />
      <ErrorMessageComponent message={titleErrorMessage} />
    </>
  );
}
