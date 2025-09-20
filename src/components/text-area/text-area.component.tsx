import type { CSSProperties, ComponentProps, ReactNode } from "react";

import clsx from "clsx";

import styles from "./text-area.module.css";

type Props = ComponentProps<"textarea"> & {
  state?: "idle" | "success" | "error";
  defaultLines?: number;
  minLines?: number;
  maxLines?: number;
};

export default function TextAreaComponent({
  className,
  style,
  state = "idle",
  defaultLines = 3,
  minLines = 1,
  maxLines = 5,
  ...otherProps
}: Props): ReactNode {
  const customStyles = {
    "--default-lines": `${defaultLines}`,
    "--min-lines": `${minLines}`,
    "--max-lines": `${maxLines}`,
  } as CSSProperties;

  return (
    <textarea
      className={clsx(styles["text-area"], styles[state], className)}
      style={{
        ...customStyles,
        ...style,
      }}
      {...otherProps}
    ></textarea>
  );
}
