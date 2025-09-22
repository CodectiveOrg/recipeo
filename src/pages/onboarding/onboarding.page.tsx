import type { ReactNode } from "react";

import { Link } from "react-router";

import ButtonComponent from "@/components/button/button.component.tsx";
import TitleComponent from "@/components/title/title.component.tsx";
import TypographyComponent from "@/components/typography/typography.component";

import styles from "./onboarding.module.css";

export default function OnboardingPage(): ReactNode {
  return (
    <div className={styles.onboarding}>
      <TitleComponent>Get Started</TitleComponent>
      <header />
      <main>
        <img src="/images/onboarding.webp" alt="" />
        <div className={styles.writings}>
          <TypographyComponent variant="h1">Start Cooking</TypographyComponent>
          <TypographyComponent as="p" variant="p1" color="text-secondary">
            Let's join our community to cook better food!
          </TypographyComponent>
        </div>
        <ButtonComponent as={Link} to="/sign-in">
          Get Started
        </ButtonComponent>
      </main>
    </div>
  );
}
