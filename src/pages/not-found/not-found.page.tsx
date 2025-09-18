import type { ReactNode } from "react";

import { Link } from "react-router";

import styles from "./not-found.module.css";

export default function NotFoundPage(): ReactNode {
  return (
    <div className={styles["not-found"]}>
      <title>Not Found</title>
      <h1>404 | Page Not Found</h1>
      <Link to="/">Go to Home Page</Link>
    </div>
  );
}
