import type { PropsWithChildren, ReactNode } from "react";

import { Link } from "react-router";

import TypographyComponent from "@/components/typography/typography.component.tsx";

import styles from "./handful.module.css";

type Props = PropsWithChildren<{
  title: string;
  viewAllHref?: string;
}>;

export default function HandfulSection({
  title,
  viewAllHref,
  children,
}: Props): ReactNode {
  return (
    <div className={styles.handful}>
      <div className={styles.header}>
        <TypographyComponent as="h2" variant="h1">
          {title}
        </TypographyComponent>
        {viewAllHref && (
          <Link to={viewAllHref} className="p2">
            View All
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}
