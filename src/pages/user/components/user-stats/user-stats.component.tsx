import type { ReactNode } from "react";

import TypographyComponent from "@/components/typography/typography.component.tsx";

import type { User } from "@/entities/user.ts";

import styles from "./user-stats.module.css";

type Props = {
  user: User;
};

export default function UserStatsComponent({ user }: Props): ReactNode {
  const stats = [
    { count: user.recipesCount, label: "Recipes" },
    { count: user.followingCount, label: "Following" },
    { count: user.followersCount, label: "Followers" },
  ];

  return (
    <div className={styles["user-stats"]}>
      {stats.map((stat) => (
        <div key={stat.label} className={styles.stat}>
          <TypographyComponent variant="h2">{stat.count}</TypographyComponent>
          <TypographyComponent variant="s" color="text-secondary">
            {stat.label}
          </TypographyComponent>
        </div>
      ))}
    </div>
  );
}
