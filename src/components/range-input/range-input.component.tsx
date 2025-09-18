import { type CSSProperties, type ComponentProps, type ReactNode } from "react";

import clsx from "clsx";

import IconComponent from "@/components/icon/icon.component.tsx";
import TypographyComponent from "@/components/typography/typography.component";

import styles from "./range-input.module.css";

type Props = Omit<ComponentProps<"input">, "type"> & {
  label: ReactNode;
  min: number;
  max: number;
  watchedValue: number;
};

export default function RangeInputComponent({
  className,
  label,
  min,
  max,
  watchedValue,
  ...otherProps
}: Props): ReactNode {
  const percentageValue = ((+watchedValue - min) / (max - min)) * 100;

  return (
    <label
      className={clsx(styles["range-input"], className)}
      style={{ "--value": `${percentageValue}%` } as CSSProperties}
    >
      {label}
      <span className={styles.hints}>
        <TypographyComponent as="span" variant="h3" color="text-secondary">
          {min}
        </TypographyComponent>
        <TypographyComponent as="span" variant="h3" color="primary">
          {+watchedValue === max ? (
            <IconComponent name="infinity-bold" />
          ) : (
            watchedValue
          )}
        </TypographyComponent>
        <TypographyComponent as="span" variant="h3" color="text-secondary">
          <IconComponent name="infinity-bold" />
        </TypographyComponent>
      </span>
      <input type="range" min={min} max={max} {...otherProps} />
    </label>
  );
}
