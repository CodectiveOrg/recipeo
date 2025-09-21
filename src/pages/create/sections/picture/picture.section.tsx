import { type ReactNode } from "react";

import { Controller, useFormContext, useFormState } from "react-hook-form";

import type { RecipeType } from "@/validation/schemas/recipe/recipe.schema.ts";

import ErrorMessageComponent from "@/components/error-message/error-message.component.tsx";
import ImageInputComponent from "@/components/image-input/image-input.component.tsx";

export default function PictureSection(): ReactNode {
  const { control } = useFormContext<RecipeType>();
  const { errors } = useFormState<RecipeType>({ control });

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
      <ErrorMessageComponent message={errors.picture?.message} />
    </div>
  );
}
