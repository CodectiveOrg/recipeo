import { type ComponentProps, type ReactNode } from "react";

import { useFormContext } from "react-hook-form";

import ButtonComponent from "@/components/button/button.component.tsx";
import DrawerComponent from "@/components/drawer/drawer.component.tsx";
import RangeInputComponent from "@/components/range-input/range-input.component.tsx";
import type { SearchFormValuesType } from "@/components/search/types/search-form-values.type.ts";
import TagInputComponent from "@/components/tag-input/tag-input.component.tsx";
import TypographyComponent from "@/components/typography/typography.component.tsx";

import { maxDurationFilter } from "@/configs/search-filters.config.ts";

import styles from "./filters-drawer.module.css";

type Props = Pick<ComponentProps<typeof DrawerComponent>, "ref">;

export default function FiltersDrawerComponent({ ref }: Props): ReactNode {
  const {
    register,
    watch,
    formState: { isSubmitting },
  } = useFormContext<SearchFormValuesType>();

  const watchedMaxDuration = watch("maxDuration");

  const handleCancelButtonClick = (): void => {
    ref.current?.close();
  };

  const rangeInputLabel = (
    <div className={styles.label}>
      <TypographyComponent as="span" variant="h2">
        Max Duration
      </TypographyComponent>
      <TypographyComponent as="span" variant="p1" color="text-secondary">
        (in minutes)
      </TypographyComponent>
    </div>
  );

  return (
    <DrawerComponent ref={ref} contentClassName={styles.content}>
      <TypographyComponent className={styles.title} variant="h2" color="text">
        Add a Filter
      </TypographyComponent>
      <div className={styles.fields}>
        <TagInputComponent label="Tag" {...register("tag")} />
        <RangeInputComponent
          label={rangeInputLabel}
          {...register("maxDuration")}
          min={10}
          max={maxDurationFilter.defaultValue}
          watchedValue={watchedMaxDuration}
        />
        <div className={styles.actions}>
          <ButtonComponent
            color="secondary"
            disabled={isSubmitting}
            onClick={handleCancelButtonClick}
          >
            Cancel
          </ButtonComponent>
          <ButtonComponent type="submit" disabled={isSubmitting}>
            Done
          </ButtonComponent>
        </div>
      </div>
    </DrawerComponent>
  );
}
