import type { ReactNode } from "react";

import clsx from "clsx";

import IconComponent from "@/components/icon/icon.component.tsx";

import {
  type SearchFilter,
  type SearchFilterKey,
  searchFilters,
} from "@/configs/search-filters.config.ts";

import useFilterParams from "@/hooks/use-filter-params.hook.ts";

import styles from "./current-filters.module.css";

export default function CurrentFiltersComponent(): ReactNode {
  const [params, setParams] = useFilterParams();

  const handleClearButtonClick = async <T extends SearchFilterKey>(
    filter: SearchFilter<T>,
  ): Promise<void> => {
    await setParams({ ...params, [filter.key]: filter.defaultValue });
  };

  const handleClearAllButtonClick = async (): Promise<void> => {
    await setParams(null);
  };

  return (
    <div className={clsx(styles["current-filters"], "s")}>
      <ul>
        {searchFilters
          .filter(
            (filter) =>
              params[filter.key] && params[filter.key] !== filter.defaultValue,
          )
          .map((filter) => (
            <li key={filter.key} className={styles.filter}>
              <div className={styles.label}>{filter.label}</div>
              <button
                className={styles.button}
                onClick={() => handleClearButtonClick(filter)}
              >
                <div>
                  {params[filter.key]}
                  {filter.valueSuffix}
                </div>
                <IconComponent
                  name="close-circle-bold"
                  color="text-secondary"
                />
              </button>
            </li>
          ))}
      </ul>
      <button
        className={clsx(styles.button, styles.danger)}
        onClick={handleClearAllButtonClick}
      >
        <IconComponent name="trash-bin-trash-bold" color="danger" />
        <div>Clear All</div>
      </button>
    </div>
  );
}
