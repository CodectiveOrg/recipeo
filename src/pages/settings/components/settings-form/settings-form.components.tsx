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

type Props = { user: User; className: string };

export default function SettingsFormComponent({
  user,
  className,
}: Props): ReactNode {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["edit-profile"],
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

  console.log(user.username);

  const handleSubmitForm = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const dto = {
      username: form.get("username") as string,
      password: form.get("password") as string,
    };
    await mutation.mutateAsync(dto);
    console.log("form", user.username);
  };

  return (
    <form
      className={clsx(styles["settings-form"], className)}
      onSubmit={handleSubmitForm}
    >
      <label>
        <TextInputComponent name="username" defaultValue={user.username} />
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
