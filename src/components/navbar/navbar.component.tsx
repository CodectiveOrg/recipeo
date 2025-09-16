import {
  type ComponentProps,
  type HTMLElementType,
  type ReactNode,
} from "react";

import { NavLink } from "react-router";

import clsx from "clsx";

import IconComponent from "@/components/icon/icon.component.tsx";

import useVerifyQuery from "@/queries/use-verify.query.ts";

import styles from "./navbar.module.css";

type Item = {
  href: string;
  title: string;
  icon: ReactNode;
  disabled?: boolean;
};

type Props = ComponentProps<HTMLElementType>;

export default function NavbarComponent({ className }: Props): ReactNode {
  const { data: currentUser } = useVerifyQuery();

  const items: Item[] = [
    {
      href: "/",
      title: "Home",
      icon: <IconComponent name="home-angle-2-bold" />,
    },
    {
      href: "/search",
      title: "Search",
      icon: <IconComponent name="magnifer-linear" />,
    },
    {
      href: "/create",
      title: "Create",
      icon: <IconComponent name="chef-hat-minimalistic-bold" />,
    },
    {
      href: "/notification",
      title: "Notification",
      icon: <IconComponent name="bell-bold" />,
    },
    {
      href: `/user/${currentUser?.id}`,
      title: "Profile",
      icon: <IconComponent name="user-bold" />,
      disabled: !currentUser,
    },
    {
      href: "/sign-in",
      title: "Sign In",
      icon: <IconComponent name="user-bold" />,
      disabled: !!currentUser,
    },
  ];

  return (
    <nav className={clsx(styles.navbar, className)}>
      <ul>
        {items
          .filter((item) => !item.disabled)
          .map((item, index) => (
            <li key={item.title}>
              <NavLink
                className={({ isActive }) =>
                  clsx("s", isActive && styles.active)
                }
                to={item.href}
              >
                {index === 2 ? (
                  <span className={styles.circle}>{item.icon}</span>
                ) : (
                  item.icon
                )}
                {item.title}
              </NavLink>
            </li>
          ))}
      </ul>
    </nav>
  );
}
