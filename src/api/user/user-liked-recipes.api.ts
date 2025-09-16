import type { PaginatedRecipesResponseDto } from "@/dto/response/paginated-recipes.response.dto.ts";

import { richFetch } from "@/utils/fetch.utils";

type Params = {
  userId: string | undefined;
  pageParam: number;
};

export async function userLikedRecipesApi({
  userId,
  pageParam,
}: Params): Promise<PaginatedRecipesResponseDto> {
  const data = await richFetch<PaginatedRecipesResponseDto>(
    `/recipe/user/${userId}/liked?page=${pageParam}`,
  );

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
