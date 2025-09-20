import type { ReactNode } from "react";

import { useFormContext } from "react-hook-form";

import IconButtonComponent from "@/components/icon-button/icon-button.component.tsx";
import IconComponent from "@/components/icon/icon.component.tsx";
import TextInputComponent from "@/components/text-input/text-input.component.tsx";

import styles from "./search-input.module.css";

export default function SearchInputComponent(): ReactNode {
  const { register, watch, setValue } = useFormContext();

  const watchedPhrase = watch("phrase");

  const handleClearButtonClick = (): void => {
    // TODO: 1. This doesn't change the url.
    //       2. This doesn't submit the form.
    setValue("phrase", "");
  };

  return (
    <TextInputComponent
      {...register("phrase")}
      className={styles["search-input"]}
      type="text"
      variant="search"
      startAdornment={<IconComponent name="magnifer-linear" />}
      endAdornment={
        watchedPhrase && (
          <IconButtonComponent onClick={handleClearButtonClick}>
            <IconComponent name="close-circle-bold" color="text" />
          </IconButtonComponent>
        )
      }
    />
  );
}
