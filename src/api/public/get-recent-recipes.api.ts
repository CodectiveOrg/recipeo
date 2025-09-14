import type { PaginatedRecipesResponseDto } from "@/dto/response/paginated-recipes.response.dto.ts";

import { richFetch } from "@/utils/fetch.utils.ts";

type Params = {
  pageParam: number;
};

export async function getRecentRecipesApi({
  pageParam,
}: Params): Promise<PaginatedRecipesResponseDto> {
  const data = await richFetch<PaginatedRecipesResponseDto>(
    `/recipe/recent?page=${pageParam}`,
  );

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
