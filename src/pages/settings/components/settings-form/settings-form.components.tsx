import { type ReactNode, use } from "react";

import { Link } from "react-router";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import {
  SettingsSchema,
  type SettingsType,
} from "@/validation/schemas/user/settings.schema.ts";

import { updateUserApi } from "@/api/user/update-user.api.ts";

import ButtonComponent from "@/components/button/button.component.tsx";
import IconComponent from "@/components/icon/icon.component.tsx";
import PasswordInputComponent from "@/components/password-input/password-input.component.tsx";
import TextInputComponent from "@/components/text-input/text-input.component.tsx";

import UserImageInputComponent from "@/pages/settings/components/user-image-input/user-image-input.component.tsx";
import { UserContext } from "@/pages/settings/context/user.context.ts";

import { convertToFormData } from "@/utils/form.utils.ts";

import styles from "./settings-form.module.css";

export default function SettingsFormComponent(): ReactNode {
  const user = use(UserContext);

  const methods = useForm({
    defaultValues: {
      picture: user.picture,
      username: user.username,
      email: user.email,
    },
    resolver: zodResolver(SettingsSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

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

  const handleFormSubmit = async (data: SettingsType): Promise<void> => {
    const formData = convertToFormData(data);
    await mutateAsync(formData);
  };

  return (
    <FormProvider {...methods}>
      <form
        className={styles["settings-form"]}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <UserImageInputComponent />
        <TextInputComponent
          {...register("username")}
          autoComplete="username"
          placeholder="MyNameIsAwesome"
          startAdornment={<IconComponent name="user-linear" color="text" />}
        />
        <TextInputComponent
          {...register("email")}
          type="email"
          autoComplete="email"
          placeholder="name@email.com"
          startAdornment={<IconComponent name="letter-linear" color="text" />}
        />
        <PasswordInputComponent
          {...register("password")}
          autoComplete="new-password"
          placeholder="new!@#$password"
          startAdornment={
            <IconComponent name="lock-keyhole-minimalistic-outline" />
          }
        />
        <div className={styles.actions}>
          <ButtonComponent
            as={Link}
            to={`/user/${user.id}`}
            color="secondary"
            size="medium"
          >
            Cancel
          </ButtonComponent>
          <ButtonComponent type="submit" size="medium" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </ButtonComponent>
        </div>
      </form>
    </FormProvider>
  );
}
