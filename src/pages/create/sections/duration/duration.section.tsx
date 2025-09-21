import { type ReactNode } from "react";

import { Controller, useFormContext, useFormState } from "react-hook-form";

import type { RecipeType } from "@/validation/schemas/recipe/recipe.schema.ts";

import ErrorMessageComponent from "@/components/error-message/error-message.component.tsx";
import TextInputComponent from "@/components/text-input/text-input.component.tsx";
import TypographyComponent from "@/components/typography/typography.component.tsx";

import styles from "./duration.module.css";

export default function DurationSection(): ReactNode {
  const { control } = useFormContext<RecipeType>();
  const { errors } = useFormState<RecipeType>({ control });

  return (
    <div className={styles.section}>
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
      <ErrorMessageComponent message={errors.duration?.message} />
    </div>
  );
}
