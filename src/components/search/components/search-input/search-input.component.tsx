import type { ReactNode } from "react";

import { useFormContext } from "react-hook-form";

import IconButtonComponent from "@/components/icon-button/icon-button.component.tsx";
import IconComponent from "@/components/icon/icon.component.tsx";
import type { SearchFormValuesType } from "@/components/search/types/search-form-values.type.ts";
import TextInputComponent from "@/components/text-input/text-input.component.tsx";

import useFilterParams from "@/hooks/use-filter-params.hook.ts";

import styles from "./search-input.module.css";

export default function SearchInputComponent(): ReactNode {
  const [params, setParams] = useFilterParams();

  // TODO: When search history items are used several times, the input doesn't react.
  const { register, watch } = useFormContext<SearchFormValuesType>();

  const watchedPhrase = watch("phrase");

  const handleClearButtonClick = async (): Promise<void> => {
    await setParams({ ...params, phrase: "" });
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
