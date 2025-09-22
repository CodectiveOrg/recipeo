import type { PaginatedRecipesResponseDto } from "@/dto/response/paginated-recipes.response.dto.ts";

import type { UserRecipesTab } from "@/queries/keys.ts";

import { richFetch } from "@/utils/fetch.utils.ts";

type Params = {
  pageParam: number;
};

export async function getUserRecipesApi(
  { pageParam }: Params,
  tab: UserRecipesTab,
  userId: string | undefined,
): Promise<PaginatedRecipesResponseDto> {
  const data = await richFetch<PaginatedRecipesResponseDto>(
    `/recipe/user/${userId}${tab === "liked" ? "/liked" : ""}?page=${pageParam}`,
  );

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
