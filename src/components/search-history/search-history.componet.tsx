import { type ReactNode } from "react";

import { Link } from "react-router";

import { useSearchHistoryStore } from "@/stores/search-history.store";

import ButtonComponent from "@/components/button/button.component.tsx";
import IconButtonComponent from "@/components/icon-button/icon-button.component.tsx";
import IconComponent from "@/components/icon/icon.component.tsx";
import TypographyComponent from "@/components/typography/typography.component.tsx";

import { searchFilters } from "@/configs/search-filters.config.ts";

import { generateSearchUrl } from "@/utils/url.utils.ts";

import styles from "./search-history.module.css";

export default function SearchHistoryComponent(): ReactNode {
  const items = useSearchHistoryStore((state) => state.searchHistoryItems);
  const remove = useSearchHistoryStore(
    (state) => state.removeSearchHistoryItem,
  );
  const clear = useSearchHistoryStore((state) => state.clearSearchHistory);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={styles["search-history"]}>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <Link to={`/search?${generateSearchUrl(item)}`}>
              <IconComponent
                name="clock-circle-linear"
                color="text-secondary"
              />
              <TypographyComponent
                as="span"
                ellipsis
                className={styles.title}
                variant="p1"
              >
                {searchFilters
                  .filter(
                    (filter) =>
                      item[filter.key] &&
                      item[filter.key] !== filter.defaultValue,
                  )
                  .map(
                    (filter) =>
                      `${item[filter.key]}${filter.valueSuffix ?? ""}`,
                  )
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
      <ButtonComponent
        variant="text"
        color="secondary"
        size="small"
        onClick={clear}
      >
        Clear Search History
      </ButtonComponent>
    </div>
  );
}
