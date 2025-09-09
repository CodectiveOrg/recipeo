import type { GetPopularRecipesResponseDto } from "@/dto/response/popularRecipes.response.dto";

import { richFetch } from "@/utils/fetch.utils.ts";

export async function getPopularRecipesApi(): Promise<
  GetPopularRecipesResponseDto[]
> {
  const data =
    await richFetch<GetPopularRecipesResponseDto[]>("/recipe/popular");

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
