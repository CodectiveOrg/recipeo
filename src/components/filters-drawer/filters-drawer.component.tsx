import { type ComponentProps, type ReactNode, useRef } from "react";

import ButtonComponent from "@/components/button/button.component";
import DrawerComponent from "@/components/drawer/drawer.component.tsx";
import FilterCategoryInputComponent from "@/components/filter-category-input/filter-category-input.component";
import RangeInputComponent from "@/components/range-input/range-input.component";
import TypographyComponent from "@/components/typography/typography.component";

import styles from "./filters-drawer.module.css";

type Props = Pick<ComponentProps<typeof DrawerComponent>, "ref"> & {};

export default function FiltersDrawerComponent({ ref }: Props): ReactNode {
  const rangeInputRef = useRef<HTMLInputElement | null>(null);

  const handleOnCancelButton = (): void => {};

  const handleOnDoneButton = (): void => {
    console.log(rangeInputRef.current?.value);
  };

  const label = (
    <div className={styles.label}>
      <TypographyComponent as="span" variant="h2">
        Cooking Duration
      </TypographyComponent>
      <TypographyComponent as="span" variant="p1" color="text-secondary">
        (in minutes)
      </TypographyComponent>
    </div>
  );

  return (
    <DrawerComponent ref={ref} contentClassName={styles.content}>
      <header>
        <TypographyComponent variant="h2" color="text">
          Add a filter
        </TypographyComponent>
      </header>
      <div className={styles.content}>
        <FilterCategoryInputComponent label="Category" />
        <RangeInputComponent
          ref={rangeInputRef}
          label={label}
          min={10}
          max={60}
        />
        <div className={styles.actions}>
          <ButtonComponent color="secondary" onClick={handleOnCancelButton}>
            Cancel
          </ButtonComponent>
          <ButtonComponent onClick={handleOnDoneButton}>Done</ButtonComponent>
        </div>
      </div>
    </DrawerComponent>
  );
}
