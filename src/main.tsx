import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router";

import { ErrorBoundary } from "react-error-boundary";

import ErrorPage from "@/pages/error/error.page.tsx";

import NuqsProvider from "@/providers/nuqs.provider.tsx";
import QueryProvider from "@/providers/query.provider.tsx";

import Routing from "./routing.tsx";

import "./index.css";
import "./styles/colors.css";
import "./styles/layout.css";
import "./styles/shadows.css";
import "./styles/typography.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <BrowserRouter>
        <QueryProvider>
          <NuqsProvider>
            <Routing />
          </NuqsProvider>
        </QueryProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
