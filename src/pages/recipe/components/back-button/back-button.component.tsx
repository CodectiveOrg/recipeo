import type { ReactNode } from "react";

import { useNavigate } from "react-router";

import clsx from "clsx";

import IconButtonComponent from "@/components/icon-button/icon-button.component";
import IconComponent from "@/components/icon/icon.component";

import styles from "./back-button.module.css";

type Props = {
  className?: string;
};

export default function BackButtonComponent({ className }: Props): ReactNode {
  const navigate = useNavigate();

  return (
    <IconButtonComponent
      className={clsx(styles["back-button"], className)}
      onClick={() => navigate(-1)}
    >
      <IconComponent name="alt-arrow-left-linear" />
    </IconButtonComponent>
  );
}
