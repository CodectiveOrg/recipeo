import type { ReactNode } from "react";

import clsx from "clsx";

import IconComponent from "@/components/icon/icon.component.tsx";

import useFilterParams from "@/hooks/use-filter-params.hook.ts";

import styles from "./current-filters.module.css";

type Chip = {
  key: string;
  label: string;
  value: string | number;
  valueSuffix?: string;
  defaultValue: string | number;
};

export default function CurrentFiltersComponent(): ReactNode {
  const [params, setParams] = useFilterParams();

  const chips: Chip[] = [
    {
      key: "phrase",
      label: "Phrase",
      value: params.phrase,
      defaultValue: "",
    },
    {
      key: "tag",
      label: "Tag",
      value: params.tag,
      defaultValue: "all",
    },
    {
      key: "maxDuration",
      label: "Max Duration",
      value: params.maxDuration,
      valueSuffix: " Min",
      defaultValue: 60,
    },
  ];

  const handleClearButtonClick = async (chip: Chip): Promise<void> => {
    await setParams({ ...params, [chip.key]: chip.defaultValue });
  };

  const handleClearAllButtonClick = async (): Promise<void> => {
    await setParams(null);
  };

  return (
    <div className={clsx(styles["current-filters"], "s")}>
      <ul>
        {chips
          .filter((chip) => chip.value && chip.value !== chip.defaultValue)
          .map((chip) => (
            <li key={chip.key} className={styles.chip}>
              <div className={styles.label}>{chip.label}</div>
              <button
                className={styles.button}
                onClick={() => handleClearButtonClick(chip)}
              >
                <div>
                  {chip.value}
                  {chip.valueSuffix}
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
