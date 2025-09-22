import { type ReactNode } from "react";

import { useNavigate } from "react-router";

import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { signInApi } from "@/api/auth/sign-in.api.ts";

import HeaderWithBackButtonComponent from "@/components/header-with-back-button/header-with-back-button.component.tsx";
import TitleComponent from "@/components/title/title.component.tsx";

import type { AuthRequestDto } from "@/dto/request/auth.request.dto.ts";

import { mutationKeys } from "@/queries/keys.ts";

import AuthSection from "@/sections/auth/auth.section.tsx";

import styles from "./sign-in.module.css";

export default function SignInPage(): ReactNode {
  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationKey: mutationKeys.signIn(),
    mutationFn: signInApi,
  });

  const handleFormSubmit = async (dto: AuthRequestDto): Promise<void> => {
    await mutateAsync(dto, {
      onSuccess: (data): void => {
        toast.success(data.message);
        navigate("/");
      },
      onError: (error): void => {
        toast.error(error.message);
      },
    });
  };

  return (
    <div className={styles["sign-in"]}>
      <TitleComponent>Sign In</TitleComponent>
      <HeaderWithBackButtonComponent title="Sign In" />
      <main>
        <AuthSection
          heading="Welcome Back!"
          passwordAutoComplete="current-password"
          submitText="Sign In"
          alternative={{
            text: "Don't have any account?",
            linkHref: "/sign-up",
            linkText: "Sign Up",
          }}
          onSubmit={handleFormSubmit}
        />
      </main>
    </div>
  );
}
