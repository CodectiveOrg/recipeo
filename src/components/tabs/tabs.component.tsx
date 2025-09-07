import { type ReactNode, useState } from "react";

import TabComponent from "./components/tab.component";

import styles from "./tabs.module.css";

type Tab = {
  id?: string | number;
  label: string;
  content: ReactNode;
};

type Props = {
  tabs: Tab[];
};

export default function TabsComponent({ tabs }: Props): ReactNode {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className={styles.tabs}>
      <div className={styles.nav}>
        {tabs.map((tab, index) => (
          <TabComponent
            key={tab.id ?? index}
            active={activeIndex === index}
            label={tab.label}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
      <div className={styles.content}>{tabs[activeIndex].content}</div>
    </div>
  );
}
