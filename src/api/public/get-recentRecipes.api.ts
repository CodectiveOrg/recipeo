import type { RecentRecipesResponseDto } from "@/dto/response/recentRecipes.response.dto";

import { richFetch } from "@/utils/fetch.utils.ts";

export async function getRecentRecipesApi(): Promise<RecentRecipesResponseDto> {
  const data = await richFetch<RecentRecipesResponseDto>("/recipe/recent");

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
