import { type ReactNode } from "react";

import { Link } from "react-router";

import { useSearchHistory } from "@/stores/search-history.store";

import IconButtonComponent from "@/components/icon-button/icon-button.component.tsx";
import IconComponent from "@/components/icon/icon.component.tsx";
import TypographyComponent from "@/components/typography/typography.component.tsx";

import { generateSearchUrl } from "@/utils/url.utils.ts";

import styles from "./search-history.module.css";

export default function SearchHistoryComponent(): ReactNode {
  const items = useSearchHistory((state) => state.items);
  const remove = useSearchHistory((state) => state.remove);

  return (
    <ul className={styles["search-history"]}>
      {items.map((item, index) => (
        <li key={index}>
          <Link to={generateSearchUrl(item)}>
            <IconComponent name="clock-circle-linear" color="text-secondary" />
            <TypographyComponent
              as="span"
              ellipsis
              className={styles.title}
              variant="p1"
            >
              {[item.query, item.tag, item.maxDuration]
                .filter(Boolean)
                .join(" - ")}
            </TypographyComponent>
          </Link>
          <IconButtonComponent onClick={() => remove(index)}>
            <IconComponent
              name="trash-bin-trash-linear"
              color="text-secondary"
            />
          </IconButtonComponent>
        </li>
      ))}
    </ul>
  );
}
