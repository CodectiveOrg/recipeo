import { type ReactNode } from "react";

import TagsSection from "@/sections/tags/tags.section";

import styles from "./home.module.css";

export default function HomePage(): ReactNode {
  return (
    <div className={styles.home}>
      <header>Header</header>
      <main>
        <TagsSection></TagsSection>
      </main>
    </div>
  );
}
