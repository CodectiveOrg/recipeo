import {
  type CSSProperties,
  type ChangeEvent,
  type ComponentProps,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import clsx from "clsx";

import IconComponent from "@/components/icon/icon.component.tsx";
import TypographyComponent from "@/components/typography/typography.component";

import styles from "./range-input.module.css";

type Props = Omit<ComponentProps<"input">, "type"> & {
  label: ReactNode;
  min: number;
  max: number;
  defaultValue?: string | number;
  value?: string | number;
};

export default function RangeInputComponent({
  ref,
  className,
  label,
  min,
  max,
  defaultValue,
  value,
  onChange,
  ...otherProps
}: Props): ReactNode {
  const localRef = useRef<HTMLInputElement | null>(null);

  const [internalValue, setInternalValue] = useState<string>(`${defaultValue}`);

  const percentageValue = ((+internalValue - min) / (max - min)) * 100;

  useEffect(() => {
    const finalValue = localRef.current?.value ?? "";
    setInternalValue(`${finalValue}`);
  }, [value, localRef]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInternalValue(localRef.current?.value ?? "");
    onChange?.(e);
  };

  return (
    <label
      className={clsx(styles["range-input"], className)}
      style={{ "--value": `${percentageValue}%` } as CSSProperties}
    >
      <span className={styles.label}>{label}</span>
      <span className={styles.hints}>
        <TypographyComponent as="span" variant="h3" color="text-secondary">
          {min}
        </TypographyComponent>
        <TypographyComponent as="span" variant="h3" color="primary">
          {+internalValue === max ? (
            <IconComponent name="infinity-bold" />
          ) : (
            internalValue
          )}
        </TypographyComponent>
        <TypographyComponent as="span" variant="h3" color="text-secondary">
          <IconComponent name="infinity-bold" />
        </TypographyComponent>
      </span>
      <input
        ref={(node) => {
          localRef.current = node;

          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        type="range"
        min={min}
        max={max}
        defaultValue={defaultValue}
        value={value}
        onChange={handleInputChange}
        {...otherProps}
      />
    </label>
  );
}
