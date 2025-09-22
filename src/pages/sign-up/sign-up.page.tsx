import { type ReactNode } from "react";

import { useNavigate } from "react-router";

import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { signUpApi } from "@/api/auth/sign-up.api.ts";

import TitleComponent from "@/components/title/title.component.tsx";

import type { AuthRequestDto } from "@/dto/request/auth.request.dto.ts";

import { mutationKeys } from "@/queries/keys.ts";

import AuthSection from "@/sections/auth/auth.section.tsx";

import styles from "./sign-up.module.css";

export default function SignUpPage(): ReactNode {
  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationKey: mutationKeys.signUp(),
    mutationFn: signUpApi,
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
    <div className={styles["sign-up"]}>
      <TitleComponent>Sing Up</TitleComponent>
      <main>
        <AuthSection
          withValidation
          heading="Welcome!"
          passwordAutoComplete="new-password"
          submitText="Sign Up"
          alternative={{
            text: "Already have an account?",
            linkHref: "/sign-in",
            linkText: "Sign In",
          }}
          onSubmit={handleFormSubmit}
        />
      </main>
    </div>
  );
}
