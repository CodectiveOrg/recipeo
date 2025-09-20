import { type ReactNode } from "react";

import { Controller, useFormContext } from "react-hook-form";

import type { RecipeType } from "@/validation/schemas/recipe.schema.ts";

import TextInputComponent from "@/components/text-input/text-input.component.tsx";
import TypographyComponent from "@/components/typography/typography.component.tsx";

import RecipeFormErrorComponent from "@/pages/create/components/recipe-form-error/recipe-form-error.component.tsx";

export default function DurationSection(): ReactNode {
  const {
    control,
    formState: { errors },
  } = useFormContext<RecipeType>();

  return (
    <div>
      <TypographyComponent as="h2" variant="h2">
        Max Duration
        {` `}
        <TypographyComponent as="span" variant="p1" color="text-secondary">
          (in minutes)
        </TypographyComponent>
      </TypographyComponent>
      <Controller
        name="duration"
        control={control}
        render={({ field }) => (
          <TextInputComponent placeholder="30..." {...field} />
        )}
      />
      <RecipeFormErrorComponent message={errors.duration?.message} />
    </div>
  );
}
