import type { ReactNode } from "react";

import { Outlet } from "react-router";

import NavbarComponent from "@/components/navbar/navbar.component.tsx";

import styles from "./signed-in.module.css";

export default function SignedInLayout(): ReactNode {
  return (
    <div className={styles["signed-in"]}>
      <Outlet />
      <NavbarComponent />
    </div>
  );
}
