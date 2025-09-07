import {
  type CSSProperties,
  type ChangeEvent,
  type ComponentProps,
  type ReactNode,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

import clsx from "clsx";

import TypographyComponent from "@/components/typography/typography.component";

import styles from "./range-input.module.css";

type Props = Omit<ComponentProps<"input">, "ref" | "type"> & {
  ref?: RefObject<HTMLInputElement | null>;
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
  const finalRef = ref ?? localRef;

  const [internalValue, setInternalValue] = useState<string>(`${defaultValue}`);

  const percentageValue = ((+internalValue - min) / (max - min)) * 100;

  useEffect(() => {
    const finalValue = finalRef.current?.value ?? "";
    setInternalValue(`${finalValue}`);
  }, [value, finalRef]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInternalValue(finalRef.current?.value ?? "");
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
          &lt;{min}
        </TypographyComponent>
        <TypographyComponent as="span" variant="h3" color="primary">
          {internalValue}
        </TypographyComponent>
        <TypographyComponent as="span" variant="h3" color="text-secondary">
          &gt;{max}
        </TypographyComponent>
      </span>
      <input
        ref={finalRef}
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
