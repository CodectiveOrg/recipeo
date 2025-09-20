import { type ReactNode } from "react";

import { Controller, useFormContext } from "react-hook-form";

import type { RecipeType } from "@/validation/schemas/recipe.schema.ts";

import TextAreaComponent from "@/components/text-area/text-area.component.tsx";
import TypographyComponent from "@/components/typography/typography.component.tsx";

import RecipeFormErrorComponent from "@/pages/create/components/recipe-form-error/recipe-form-error.component.tsx";

export default function DescriptionSection(): ReactNode {
  const {
    control,
    formState: { errors },
  } = useFormContext<RecipeType>();

  return (
    <div>
      <TypographyComponent as="h2" variant="h2">
        Description
      </TypographyComponent>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextAreaComponent
            placeholder="Tell a little about your food"
            {...field}
          />
        )}
      />
      <RecipeFormErrorComponent message={errors.description?.message} />
    </div>
  );
}
