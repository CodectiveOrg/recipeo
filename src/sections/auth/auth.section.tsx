import {
  type ChangeEvent,
  type FormEvent,
  type HTMLInputAutoCompleteAttribute,
  type ReactNode,
  useState,
} from "react";

import { Link } from "react-router";

import AuthValidationComponent from "@/sections/auth/components/auth-validation/auth-validation.component.tsx";
import { useAuthValidationHook } from "@/sections/auth/hooks/use-auth-validation.hook.ts";

import ButtonComponent from "@/components/button/button.component.tsx";
import IconComponent from "@/components/icon/icon.component.tsx";
import PasswordInputComponent from "@/components/password-input/password-input.component.tsx";
import TextInputComponent from "@/components/text-input/text-input.component.tsx";
import TypographyComponent from "@/components/typography/typography.component.tsx";

import type { AuthRequestDto } from "@/dto/request/auth.request.dto.ts";

import styles from "./auth.module.css";

type Alternative = {
  text: string;
  linkHref: string;
  linkText: string;
};

type Props = {
  withValidation?: boolean;
  heading: string;
  passwordAutoComplete: HTMLInputAutoCompleteAttribute;
  submitText: string;
  alternative: Alternative;
  onSubmit?: (dto: AuthRequestDto) => void;
};

export default function AuthSection({
  withValidation = false,
  heading,
  passwordAutoComplete,
  submitText,
  alternative,
  onSubmit,
}: Props): ReactNode {
  const [password, setPassword] = useState<string>("");

  const rules = useAuthValidationHook(password);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleFormSubmit = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const dto = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };

    onSubmit?.(dto);
  };

  return (
    <div className={styles.auth}>
      <div className={styles.writings}>
        <TypographyComponent variant="h1">{heading}</TypographyComponent>
        <TypographyComponent p variant="p2" color="text-secondary">
          Please enter your account here
        </TypographyComponent>
      </div>
      <form onSubmit={handleFormSubmit}>
        <TextInputComponent
          name="username"
          placeholder="Username"
          startAdornment={<IconComponent name="user-linear" color="text" />}
        />
        <PasswordInputComponent
          name="password"
          placeholder="Password"
          autoComplete={passwordAutoComplete}
          value={password}
          onChange={handlePasswordChange}
          startAdornment={
            <IconComponent name="lock-keyhole-minimalistic-outline" />
          }
        />
        {withValidation && <AuthValidationComponent rules={rules} />}
        <ButtonComponent
          disabled={withValidation && rules.some((rule) => !rule.isValid)}
        >
          {submitText}
        </ButtonComponent>
      </form>
      <div className={styles.alternative}>
        <TypographyComponent p variant="p2">
          {alternative.text}
        </TypographyComponent>
        <Link className="h3" to={alternative.linkHref}>
          {alternative.linkText}
        </Link>
      </div>
    </div>
  );
}
