import type { ReactNode } from "react";

import IconComponent from "@/components/icon/icon.component.tsx";

import useVerifyQuery from "@/queries/use-verify.query.ts";

import { getTime, greetingsIcons } from "@/utils/greetings-time.utils.ts";

import styles from "./greetings.module.css";

export default function Greetings(): ReactNode {
  const { data: currentUser } = useVerifyQuery();

  const time = getTime();

  return (
    <div className={styles.greetings}>
      <IconComponent name={greetingsIcons[time]} className={styles.icon} />
      <span className={styles.writings}>Good {time}</span>
      <span className={styles.username}>{currentUser?.username}</span>
    </div>
  );
}
