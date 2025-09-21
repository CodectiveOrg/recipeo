import { type ReactNode } from "react";

import { Controller, useFormContext } from "react-hook-form";

import type { RecipeType } from "@/validation/schemas/recipe.schema.ts";

import ImageInputComponent from "@/components/image-input/image-input.component.tsx";

import RecipeFormErrorComponent from "@/pages/create/components/recipe-form-error/recipe-form-error.component.tsx";

export default function PictureSection(): ReactNode {
  const {
    control,
    formState: { errors },
  } = useFormContext<RecipeType>();

  return (
    <div>
      <Controller
        name="picture"
        control={control}
        render={({ field }) => (
          <ImageInputComponent
            folder="recipe"
            onChange={(file) => field.onChange(file)}
          />
        )}
      />
      <RecipeFormErrorComponent message={errors.picture?.message} />
    </div>
  );
}
