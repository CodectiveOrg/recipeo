import { type ReactNode } from "react";

import { Controller, useFormContext } from "react-hook-form";

import type { RecipeType } from "@/validation/schemas/recipe.schema.ts";

import TextInputComponent from "@/components/text-input/text-input.component.tsx";

type Props = {
  index: number;
};

export default function IngredientInputComponent({ index }: Props): ReactNode {
  const { control } = useFormContext<RecipeType>();

  return (
    <Controller
      name={`ingredients.${index}.title`}
      control={control}
      render={({ field }) => (
        <TextInputComponent
          type="text"
          placeholder={`Ingredient...`}
          {...field}
        />
      )}
    />
  );
}
