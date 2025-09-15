import type { ReactNode } from "react";

import clsx from "clsx";

import ImageComponent from "@/components/image/image.component.tsx";
import TypographyComponent from "@/components/typography/typography.component.tsx";

import type { EssentialUser } from "@/entities/user.ts";

import styles from "./user-badge.module.css";

type Props = {
  className?: string;
  user: EssentialUser;
  size?: "medium" | "large";
};

export default function UserBadgeComponent({
  className,
  user,
  size = "medium",
}: Props): ReactNode {
  return (
    <span className={clsx(styles["user-badge"], styles[size], className)}>
      <ImageComponent folder="user" src={user.picture} alt="" />
      <TypographyComponent
        as="span"
        ellipsis
        variant={size === "medium" ? "s" : "h3"}
      >
        {user.username}
      </TypographyComponent>
    </span>
  );
}
