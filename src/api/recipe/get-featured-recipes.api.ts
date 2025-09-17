import type { PaginatedFeaturedRecipesResponseDto } from "@/dto/response/paginated-featured-recipes.response.dto.ts";

import { richFetch } from "@/utils/fetch.utils.ts";

type Params = {
  pageParam: number;
};

export async function getFeaturedRecipesApi({
  pageParam,
}: Params): Promise<PaginatedFeaturedRecipesResponseDto> {
  const data = await richFetch<PaginatedFeaturedRecipesResponseDto>(
    `/recipe/featured?page=${pageParam}`,
  );

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
