import type { ReactNode } from "react";

import { Outlet } from "react-router";

import { NuqsAdapter } from "nuqs/adapters/react-router/v7";

import ToastComponent from "@/components/toast/toast.component.tsx";

import styles from "./root.module.css";

export default function RootLayout(): ReactNode {
  return (
    <div className={styles.root}>
      <NuqsAdapter>
        <Outlet />
      </NuqsAdapter>
      <ToastComponent />
    </div>
  );
}
