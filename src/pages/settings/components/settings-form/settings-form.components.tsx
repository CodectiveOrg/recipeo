import { type FormEvent, type ReactNode } from "react";

import clsx from "clsx";

import ButtonComponent from "@/components/button/button.component.tsx";
import PasswordInputComponent from "@/components/password-input/password-input.component.tsx";
import TextInputComponent from "@/components/text-input/text-input.component.tsx";

import type { User } from "@/entities/user.ts";

import styles from "./settings-form.module.css";

type Props = { user: User; className: string };

export default function SettingsFormComponent({
  user,
  className,
}: Props): ReactNode {
  const handleSubmitForm = (e: FormEvent<HTMLFormElement>): void => {
    const form = new FormData(e.currentTarget);

    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");

    console.log(name, email, password);
  };

  console.log(user);

  return (
    <form
      className={clsx(styles["settings-form"], className)}
      onSubmit={handleSubmitForm}
    >
      <label>
        <TextInputComponent name="name" defaultValue={user.username} />
      </label>
      <label>
        <PasswordInputComponent
          name="password"
          defaultValue={user.password}
          placeholder="********"
        />
      </label>
      <ButtonComponent>Save</ButtonComponent>
    </form>
  );
}
