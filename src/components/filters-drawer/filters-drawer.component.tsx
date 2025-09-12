import { type ReactNode, useRef } from "react";

import TagsSection from "@/sections/tags/tags.section";

import ButtonComponent from "@/components/button/button.component";
import RangeInputComponent from "@/components/range-input/range-input.component";
import TypographyComponent from "@/components/typography/typography.component";

import styles from "./filters-drawer.module.css";

export default function FiltersDrawerComponent(): ReactNode {
  const rangeInputRef = useRef<HTMLInputElement | null>(null);

  const handleOnCancelButton = () => {};

  const handleOnDoneButton = () => {
    console.log(rangeInputRef.current?.value);
  };

  const label = (
    <>
      <TypographyComponent as="span" variant="h2">
        Cooking Duration
      </TypographyComponent>
      <TypographyComponent as="span" variant="p1" color="text-secondary">
        (in minutes)
      </TypographyComponent>
    </>
  );

  return (
    <div className={styles["filters-drawer"]}>
      <header>
        <TypographyComponent variant="h2">Add a filter</TypographyComponent>
      </header>
      <div className={styles.content}>
        <TagsSection />
        <RangeInputComponent
          label={label}
          ref={rangeInputRef}
          min={10}
          max={60}
        ></RangeInputComponent>
        <div className={styles.action}>
          <ButtonComponent color="secondary" onClick={handleOnCancelButton}>
            Cancel
          </ButtonComponent>
          <ButtonComponent onClick={handleOnDoneButton}>Done</ButtonComponent>
        </div>
      </div>
    </div>
  );
}
