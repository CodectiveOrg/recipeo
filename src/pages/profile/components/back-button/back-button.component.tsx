import type { ReactNode } from "react";

import { useNavigate } from "react-router";

import IconButtonComponent from "@/components/icon-button/icon-button.component";
import IconComponent from "@/components/icon/icon.component";

import styles from "./back-button.module.css";

export default function BackButtonComponent(): ReactNode {
  const navigate = useNavigate();

  return (
    <IconButtonComponent onClick={() => navigate(-1)}>
      <IconComponent name="alt-arrow-left-linear" className={styles.icon} />
    </IconButtonComponent>
  );
}
