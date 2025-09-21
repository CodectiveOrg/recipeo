import { type ReactNode } from "react";

import { Controller, useFormContext, useFormState } from "react-hook-form";

import type { RecipeType } from "@/validation/schemas/recipe/recipe.schema.ts";

import ErrorMessageComponent from "@/components/error-message/error-message.component.tsx";
import TextAreaComponent from "@/components/text-area/text-area.component.tsx";
import TypographyComponent from "@/components/typography/typography.component.tsx";

import styles from "./description.module.css";

export default function DescriptionSection(): ReactNode {
  const { control } = useFormContext<RecipeType>();
  const { errors } = useFormState<RecipeType>({ control });

  return (
    <div className={styles.section}>
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
      <ErrorMessageComponent message={errors.description?.message} />
    </div>
  );
}
