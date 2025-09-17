import { type ReactNode, useEffect } from "react";

import { useSearchHistory } from "@/stores/search-history.store";

import type { SearchHistoryType } from "@/types/search-history.type";

import ItemComponent from "./components/item/item.component";

import styles from "./search-history.module.css";

const load = (): SearchHistoryType[] => {
  const item = localStorage.getItem("search-history");
  if (!item) {
    return [];
  }

  return JSON.parse(item);
};

const save = (list: SearchHistoryType[]): void => {
  localStorage.setItem("search-history", JSON.stringify(list));
};

export default function SearchHistoryComponent(): ReactNode {
  useEffect(() => {
    useSearchHistory.getState().initialize(load());
  }, []);

  return (
    <ul className={styles["search-history"]}>
      {useSearchHistory.getState().list.map((item) => (
        <ItemComponent key={item.id} {...item}></ItemComponent>
      ))}
    </ul>
  );
}
