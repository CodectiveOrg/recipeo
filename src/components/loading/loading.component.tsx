import type { ReactNode } from "react";

import styles from "./loading.module.css";

export default function LoadingComponent(): ReactNode {
  return <div className={styles.loading}>Loading...</div>;
}
