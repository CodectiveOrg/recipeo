import type { ReactNode } from "react";

import { useNavigate } from "react-router";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { signOutApi } from "@/api/auth/sign-out.api.ts";

import ButtonComponent from "@/components/button/button.component.tsx";
import IconComponent from "@/components/icon/icon.component.tsx";

import styles from "./sign-out-button.module.css";

export default function SignOutButtonComponent(): ReactNode {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationKey: ["sign-out"],
    mutationFn: signOutApi,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async (result) => {
      queryClient.removeQueries({ queryKey: ["user"] });
      queryClient.removeQueries({ queryKey: ["verify"] });

      toast.success(result.message);

      navigate("/");
    },
  });

  const handleSignOutButtonClick = async (): Promise<void> => {
    await mutateAsync();
  };

  return (
    <ButtonComponent
      iconOnly
      className={styles["sign-out-button"]}
      variant="outlined"
      color="danger"
      onClick={handleSignOutButtonClick}
    >
      <IconComponent name="logout-2-linear" />
    </ButtonComponent>
  );
}
