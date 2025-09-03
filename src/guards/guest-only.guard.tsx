import type { ReactNode } from "react";

import { Navigate, Outlet } from "react-router";

import LoadingComponent from "@/components/loading/loading.component.tsx";

import useVerifyQuery from "@/queries/use-verify.query.ts";

export default function GuestOnlyGuard(): ReactNode {
  const { isPending, isError } = useVerifyQuery();

  if (isPending) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
}
