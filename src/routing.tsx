import type { ReactNode } from "react";

import { Route, Routes } from "react-router";

import GuestOnlyGuard from "@/guards/guest-only.guard.tsx";
import SignedInOnlyGuard from "@/guards/signed-in-only.guard.tsx";

import GuestLayout from "@/layouts/guest/guest.layout.tsx";
import RootLayout from "@/layouts/root/root.layout.tsx";
import SignedInLayout from "@/layouts/signed-in/signed-in.layout.tsx";

import NotFoundPage from "@/pages/not-found/not-found.page.tsx";
import OnboardingPage from "@/pages/onboarding/onboarding.page.tsx";
import SignInPage from "@/pages/sign-in/sign-in.page.tsx";
import SignUpPage from "@/pages/sign-up/sign-up.page.tsx";

import HomePage from "./pages/home/home.page.tsx";

export default function Routing(): ReactNode {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route element={<GuestOnlyGuard />}>
          <Route element={<GuestLayout />}>
            <Route path="onboarding" element={<OnboardingPage />} />
            <Route path="sign-in" element={<SignInPage />} />
            <Route path="sign-up" element={<SignUpPage />} />
          </Route>
        </Route>
        <Route element={<SignedInOnlyGuard />}>
          <Route element={<SignedInLayout />}>
            <Route index element={<HomePage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
