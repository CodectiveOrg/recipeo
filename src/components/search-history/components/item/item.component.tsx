import type { ReactNode } from "react";

import IconComponent from "@/components/icon/icon.component";
import TypographyComponent from "@/components/typography/typography.component";

import type { SearchHistoryType } from "@/types/search-history.type";

import styles from "./item.module.css";

type Props = Omit<SearchHistoryType, "id">

export default function ItemComponent({ title }: Props): ReactNode {
  return (
    <li className={styles.item}>
      <IconComponent className={styles.icon} name="clock-circle-linear" />
      <TypographyComponent as="span" variant="p1">
        {title}
      </TypographyComponent>
      <IconComponent className={styles.icon} name="arrow-left-up-linear" />
    </li>
  );
}
