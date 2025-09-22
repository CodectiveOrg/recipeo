import type { PaginatedRecipesResponseDto } from "@/dto/response/paginated-recipes.response.dto.ts";

import type { InfiniteRecipesType } from "@/queries/keys.ts";

import { richFetch } from "@/utils/fetch.utils.ts";

type Params = {
  pageParam: number;
};

export async function getRecipesApi(
  { pageParam }: Params,
  type: InfiniteRecipesType,
): Promise<PaginatedRecipesResponseDto> {
  const data = await richFetch<PaginatedRecipesResponseDto>(
    `/recipe/${type}?page=${pageParam}`,
  );

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
