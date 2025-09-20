import { type ReactNode } from "react";

import { Controller, useFormContext } from "react-hook-form";

import type { RecipeType } from "@/validation/schemas/recipe.schema.ts";

import ImageInputComponent from "@/components/image-input/image-input.component.tsx";
import TextAreaComponent from "@/components/text-area/text-area.component.tsx";

import styles from "./step-input.module.css";

type Props = {
  index: number;
};

export function StepInputComponent({ index }: Props): ReactNode {
  const { control } = useFormContext<RecipeType>();

  return (
    <div className={styles["step-input"]}>
      <Controller
        name={`steps.${index}.description`}
        control={control}
        render={({ field }) => (
          <TextAreaComponent
            placeholder="Tell a little about your food..."
            {...field}
          />
        )}
      />
      <Controller
        name={`steps.${index}.picture`}
        control={control}
        render={({ field }) => (
          <ImageInputComponent
            layout="simple"
            previouslyUploadedPicture={
              typeof field.value === "string" ? field.value : undefined
            }
            {...field}
            value={undefined}
          />
        )}
      />
    </div>
  );
}
