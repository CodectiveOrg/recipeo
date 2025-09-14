import type { PaginatedRecipesResponseDto } from "@/dto/response/paginated-recipes.response.dto.ts";

import { richFetch } from "@/utils/fetch.utils.ts";

export async function getPopularRecipesApi(): Promise<PaginatedRecipesResponseDto> {
  const data = await richFetch<PaginatedRecipesResponseDto>("/recipe/popular");

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
