import { type ReactNode } from "react";

import { Link } from "react-router";

import { useSearchHistoryStore } from "@/stores/search-history.store";

import ButtonComponent from "@/components/button/button.component.tsx";
import IconButtonComponent from "@/components/icon-button/icon-button.component.tsx";
import IconComponent from "@/components/icon/icon.component.tsx";
import TypographyComponent from "@/components/typography/typography.component.tsx";

import { generateSearchUrl } from "@/utils/url.utils.ts";

import styles from "./search-history.module.css";

export default function SearchHistoryComponent(): ReactNode {
  const items = useSearchHistoryStore((state) => state.searchHistoryItems);
  const remove = useSearchHistoryStore(
    (state) => state.removeSearchHistoryItem,
  );
  const clear = useSearchHistoryStore((state) => state.clearSearchHistory);

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
                {[item.phrase, item.tag, item.maxDuration]
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
      {items.length > 0 && (
        <ButtonComponent
          variant="text"
          color="secondary"
          size="small"
          onClick={clear}
        >
          Clear Search History
        </ButtonComponent>
      )}
    </div>
  );
}
