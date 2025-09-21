import { type ReactNode } from "react";

import { Controller, useFormContext, useFormState } from "react-hook-form";

import type { RecipeType } from "@/validation/schemas/recipe/recipe.schema.ts";

import ErrorMessageComponent from "@/components/error-message/error-message.component.tsx";
import TextInputComponent from "@/components/text-input/text-input.component.tsx";
import TypographyComponent from "@/components/typography/typography.component.tsx";

import styles from "./title.module.css";

export default function TitleSection(): ReactNode {
  const { control } = useFormContext<RecipeType>();
  const { errors } = useFormState<RecipeType>({ control });

  return (
    <div className={styles.section}>
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
      <ErrorMessageComponent message={errors.title?.message} />
    </div>
  );
}
