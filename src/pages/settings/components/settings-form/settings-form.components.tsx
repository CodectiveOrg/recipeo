import { type FormEvent, type ReactNode } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import clsx from "clsx";

import { updateUserApi } from "@/api/user/update-user.api.ts";

import ButtonComponent from "@/components/button/button.component.tsx";
import PasswordInputComponent from "@/components/password-input/password-input.component.tsx";
import TextInputComponent from "@/components/text-input/text-input.component.tsx";

import type { User } from "@/entities/user.ts";

import styles from "./settings-form.module.css";

type Props = { user: User; className?: string };

export default function SettingsFormComponent({
  user,
  className,
}: Props): ReactNode {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationKey: ["user", user.id],
    mutationFn: updateUserApi,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async (result) => {
      await Promise.allSettled([
        queryClient.invalidateQueries({ queryKey: ["verify"] }),
        queryClient.invalidateQueries({ queryKey: ["user", user.id] }),
      ]);

      toast.success(result.message);
    },
  });

  const handleFormSubmit = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    await mutateAsync({
      user: {
        username: formData.get("username") as string,
        password: formData.get("password") as string,
        email: formData.get("email") as string,
      },
    });
  };

  return (
    <form
      className={clsx(styles["settings-form"], className)}
      onSubmit={handleFormSubmit}
    >
      <TextInputComponent name="username" defaultValue={user.username} />
      <TextInputComponent
        name="email"
        type="email"
        defaultValue={user.email}
      ></TextInputComponent>
      <PasswordInputComponent name="password" />
      <ButtonComponent type="submit">Save</ButtonComponent>
    </form>
  );
}
