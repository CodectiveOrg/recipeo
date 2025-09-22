import type { ReactNode } from "react";

import { Link } from "react-router";

import clsx from "clsx";

import ImageComponent, {
  ImageSkeleton,
} from "@/components/image/image.component.tsx";
import TypographyComponent, {
  TypographySkeleton,
} from "@/components/typography/typography.component.tsx";

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
    <Link
      className={clsx(styles["user-badge"], styles[size], className)}
      to={`/user/${user?.id}`}
    >
      <ImageComponent
        className={styles.picture}
        folder="user"
        src={user?.picture}
        alt=""
      />
      <TypographyComponent
        as="span"
        ellipsis
        variant={size === "medium" ? "s" : "h3"}
      >
        {user?.username}
      </TypographyComponent>
    </Link>
  );
}

export function UserBadgeSkeleton({
  className,
  size = "medium",
}: Partial<Props>): ReactNode {
  return (
    <span className={clsx(styles["user-badge"], styles[size], className)}>
      <ImageSkeleton className={styles.picture} />
      <TypographySkeleton
        as="span"
        ellipsis
        variant={size === "medium" ? "s" : "h3"}
        inlineSize={60}
      />
    </span>
  );
}
