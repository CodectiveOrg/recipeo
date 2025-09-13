import { type ReactNode } from "react";

import FiltersDrawerComponent from "@/components/filters-drawer/filters-drawer.component";

import styles from "./home.module.css";

export default function HomePage(): ReactNode {
  return (
    <div className={styles.home}>
      <header>Header</header>
      <main>
        <FiltersDrawerComponent />
      </main>
    </div>
  );
}
