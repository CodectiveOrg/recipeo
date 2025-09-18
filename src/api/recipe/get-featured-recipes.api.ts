import type { GetFeaturedRecipesResponseDto } from "@/dto/response/get-featured-recipes.response.dto.ts";

import { richFetch } from "@/utils/fetch.utils.ts";

export async function getFeaturedRecipesApi(): Promise<GetFeaturedRecipesResponseDto> {
  const data =
    await richFetch<GetFeaturedRecipesResponseDto>("/recipe/featured");

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
