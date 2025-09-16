import {
  type ComponentProps,
  type HTMLElementType,
  type ReactNode,
} from "react";

import { NavLink } from "react-router";

import clsx from "clsx";

import IconComponent from "@/components/icon/icon.component.tsx";

import styles from "./navbar.module.css";

type Item = {
  href: string;
  title: string;
  icon: ReactNode;
};

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
    href: "/user",
    title: "Profile",
    icon: <IconComponent name="user-bold" />,
  },
];

type Props = ComponentProps<HTMLElementType>;

export default function NavbarComponent({ className }: Props): ReactNode {
  return (
    <nav className={clsx(styles.navbar, className)}>
      <ul>
        {items.map((item, index) => (
          <li key={item.title}>
            <NavLink
              className={({ isActive }) => clsx("s", isActive && styles.active)}
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
