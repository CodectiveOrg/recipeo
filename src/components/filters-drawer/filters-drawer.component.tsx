import { type ReactNode, useRef } from "react";

import ButtonComponent from "@/components/button/button.component";
import RangeInputComponent from "@/components/range-input/range-input.component";
import TypographyComponent from "@/components/typography/typography.component";

import styles from "./filters-drawer.module.css";

export default function FiltersDrawerComponent(): ReactNode {
  const rangeInputRef = useRef<HTMLInputElement | null>(null);

  const handleOnCancelButton = () => {};

  const handleOnDoneButton = () => {};

  return (
    <div className={styles["filters-drawer"]}>
      <TypographyComponent variant="h2">Add a filter</TypographyComponent>
      <RangeInputComponent
        label="Cooking Duration"
        ref={rangeInputRef}
        min={10}
        max={60}
      ></RangeInputComponent>
      <div>
        <ButtonComponent onClick={handleOnCancelButton}>Cancel</ButtonComponent>
        <ButtonComponent onClick={handleOnDoneButton}>Done</ButtonComponent>
      </div>
    </div>
  );
}
