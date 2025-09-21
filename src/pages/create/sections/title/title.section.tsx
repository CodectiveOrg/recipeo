import { type ReactNode } from "react";

import { Controller, useFormContext, useFormState } from "react-hook-form";

import type { RecipeType } from "@/validation/schemas/recipe.schema.ts";

import TextInputComponent from "@/components/text-input/text-input.component.tsx";
import TypographyComponent from "@/components/typography/typography.component.tsx";

import RecipeFormErrorComponent from "@/pages/create/components/recipe-form-error/recipe-form-error.component.tsx";

export default function TitleSection(): ReactNode {
  const { control } = useFormContext<RecipeType>();
  const { errors } = useFormState({ control });

  return (
    <div>
      <TypographyComponent as="h2" variant="h2">
        Food Name
      </TypographyComponent>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextInputComponent placeholder="Enter food name" {...field} />
        )}
      />
      <RecipeFormErrorComponent message={errors.title?.message} />
    </div>
  );
}
