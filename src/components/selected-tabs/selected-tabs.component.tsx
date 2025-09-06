import { type ReactNode, useState } from "react";

import TabComponent from "./components/tab.component";

import styles from "./selected-tabs.module.css";

type Tab = {
  label: string;
  content: ReactNode;
};

type Props = {
  tabList: Tab[];
};

export default function SelectedTabsComponent({ tabList }: Props): ReactNode {
  const [state, setState] = useState(0);

  return (
    <div className={styles["selected-tabs"]}>
      <div className={styles.tabs}>
        {tabList?.map((tab, index) => (
          <TabComponent
            key={index}
            label={tab.label}
            color={state === index ? "primary" : "secondary"}
            selected={state === index ? "active" : "deactive"}
            onClick={() => setState(index)}
          />
        ))}
      </div>
      <div className={styles["content"]}>{tabList[state].content}</div>
    </div>
  );
}
