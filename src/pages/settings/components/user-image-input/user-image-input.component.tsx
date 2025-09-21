import { type ReactNode } from "react";

import { Controller, useFormContext, useFormState } from "react-hook-form";

import type { SettingsType } from "@/validation/schemas/user/settings.schema.ts";

import ErrorMessageComponent from "@/components/error-message/error-message.component.tsx";
import ImageInputComponent from "@/components/image-input/image-input.component.tsx";

import styles from "./user-image-input.module.css";

export default function UserImageInputComponent(): ReactNode {
  const { control } = useFormContext<SettingsType>();
  const { errors } = useFormState<SettingsType>({ control });

  return (
    <>
      <Controller
        name="picture"
        control={control}
        render={({ field }) => (
          <ImageInputComponent
            className={styles["user-image-input"]}
            layout="profile"
            folder="user"
            previouslyUploadedPicture={
              typeof field.value === "string" ? field.value : undefined
            }
            onChange={(file) => field.onChange(file)}
          />
        )}
      />
      <ErrorMessageComponent message={errors.picture?.message} />
    </>
  );
}
