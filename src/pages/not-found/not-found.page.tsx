import type { ReactNode } from "react";

import { Link } from "react-router";

import TitleComponent from "@/components/title/title.component.tsx";

import styles from "./not-found.module.css";

export default function NotFoundPage(): ReactNode {
  return (
    <div className={styles["not-found"]}>
      <TitleComponent>Not Found</TitleComponent>
      <h1>404 | Page Not Found</h1>
      <Link to="/">Go to Home Page</Link>
    </div>
  );
}
