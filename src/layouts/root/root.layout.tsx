import type { ReactNode } from "react";

import { Outlet } from "react-router";

import { NuqsAdapter } from "nuqs/adapters/react-router/v7";

import NavbarComponent from "@/components/navbar/navbar.component.tsx";
import ToastComponent from "@/components/toast/toast.component.tsx";

import styles from "./root.module.css";

export default function RootLayout(): ReactNode {
  return (
    <NuqsAdapter>
      <div className={styles.root}>
        <Outlet />
        <NavbarComponent />
      </div>
      <ToastComponent />
    </NuqsAdapter>
  );
}
