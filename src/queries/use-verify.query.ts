import { useQuery } from "@tanstack/react-query";

import { verifyTokenApi } from "@/api/auth/verify-token.api.ts";

import { authKeys } from "@/queries/keys.ts";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useVerifyQuery() {
  return useQuery({
    queryKey: authKeys.verify(),
    queryFn: verifyTokenApi,
    retry: 0,
  });
}
