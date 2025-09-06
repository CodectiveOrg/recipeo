import { type ReactNode } from "react";

import { useNavigate } from "react-router";

import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";

import AuthSection from "@/sections/auth/auth.section.tsx";

import { signInApi } from "@/api/auth/sign-in.api.ts";

import type { AuthRequestDto } from "@/dto/request/auth.request.dto.ts";

import styles from "./sign-in.module.css";

export default function SignInPage(): ReactNode {
  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationKey: ["sign-in"],
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
