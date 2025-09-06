import { type ReactNode } from "react";

import { useNavigate } from "react-router";

import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";

import AuthSection from "@/sections/auth/auth.section.tsx";

import { signUpApi } from "@/api/auth/sign-up.api.ts";

import type { AuthRequestDto } from "@/dto/request/auth.request.dto.ts";

import styles from "./sign-up.module.css";

export default function SignUpPage(): ReactNode {
  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationKey: ["sign-up"],
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
