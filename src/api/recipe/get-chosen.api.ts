import type { PaginatedRecipesResponseDto } from "@/dto/response/paginated-recipes.response.dto.ts";

import { richFetch } from "@/utils/fetch.utils";

export async function getChosenApi(): Promise<PaginatedRecipesResponseDto> {
  const data = await richFetch<PaginatedRecipesResponseDto>("/recipe/chosen");

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
