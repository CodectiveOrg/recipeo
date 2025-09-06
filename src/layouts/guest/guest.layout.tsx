import type { ReactNode } from "react";

import { Outlet } from "react-router";

import styles from "./guest.module.css";

export default function GuestLayout(): ReactNode {
  return (
    <div className={styles.guest}>
      <Outlet />
    </div>
  );
}
