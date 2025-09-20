import type { ReactNode } from "react";

import TitleComponent from "@/components/title/title.component.tsx";

import styles from "./error.module.css";

export default function ErrorPage(): ReactNode {
  return (
    <div className={styles.error}>
      <TitleComponent>Something Went Wrong...</TitleComponent>
      <h1>Oops! Something Went Wrong...</h1>
      <a href="/">Go to Home Page</a>
    </div>
  );
}
