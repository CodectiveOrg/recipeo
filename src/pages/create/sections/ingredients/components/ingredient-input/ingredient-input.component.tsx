import { type ReactNode } from "react";

import { Controller, useFormContext, useFormState } from "react-hook-form";

import type { RecipeType } from "@/validation/schemas/recipe.schema.ts";

import TextInputComponent from "@/components/text-input/text-input.component.tsx";

import RecipeFormErrorComponent from "@/pages/create/components/recipe-form-error/recipe-form-error.component.tsx";

type Props = {
  index: number;
};

export default function IngredientInputComponent({ index }: Props): ReactNode {
  const { control } = useFormContext<RecipeType>();
  const { errors, isSubmitted } = useFormState({ control });

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
      <RecipeFormErrorComponent message={titleErrorMessage} />
    </>
  );
}
