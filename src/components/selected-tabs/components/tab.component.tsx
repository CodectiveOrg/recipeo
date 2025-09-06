import type { ReactNode } from "react";

import clsx from "clsx";

import ButtonComponent from "@/components/button/button.component";

import styles from "./tab.module.css";

type Props = {
  label: string;
  color: "primary" | "secondary";
  selected: "active" | "deactive";
  onClick: () => void;
};
export default function TabComponent({
  label,
  selected,
  color,
  onClick,
}: Props): ReactNode {
  return (
    <ButtonComponent
      variant="text"
      size="large"
      color={color}
      className={clsx(styles["tab-button"], styles[selected])}
      key={label}
      onClick={onClick}
    >
      {label}
    </ButtonComponent>
  );
}
