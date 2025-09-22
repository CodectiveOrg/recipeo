import type { ReactNode } from "react";

import { Route, Routes } from "react-router";

import GuestOnlyGuard from "@/guards/guest-only.guard.tsx";
import SignedInOnlyGuard from "@/guards/signed-in-only.guard.tsx";

import RootLayout from "@/layouts/root/root.layout.tsx";

import CreatePage from "@/pages/create/create.page.tsx";
import HomePage from "@/pages/home/home.page.tsx";
import NotFoundPage from "@/pages/not-found/not-found.page.tsx";
import OnboardingPage from "@/pages/onboarding/onboarding.page.tsx";
import RecipePage from "@/pages/recipe/recipe.page.tsx";
import RecipesPage from "@/pages/recipes/recipes.page.tsx";
import SearchPage from "@/pages/search/search.page";
import SettingsPage from "@/pages/settings/settings.page.tsx";
import SignInPage from "@/pages/sign-in/sign-in.page.tsx";
import SignUpPage from "@/pages/sign-up/sign-up.page.tsx";
import TagsPage from "@/pages/tags/tags.page.tsx";
import UserPage from "@/pages/user/user.page.tsx";

export default function Routing(): ReactNode {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route element={<GuestOnlyGuard />}>
          <Route path="onboarding" element={<OnboardingPage />} />
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
        </Route>
        <Route element={<SignedInOnlyGuard />}>
          <Route path="create" element={<CreatePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route index element={<HomePage />} />
        <Route path="tags" element={<TagsPage />} />
        <Route path="chosen" element={<RecipesPage type="chosen" />} />
        <Route path="popular" element={<RecipesPage type="popular" />} />
        <Route path="recent" element={<RecipesPage type="recent" />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="recipe/:recipeId" element={<RecipePage />} />
        <Route path="user/:userId" element={<UserPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
