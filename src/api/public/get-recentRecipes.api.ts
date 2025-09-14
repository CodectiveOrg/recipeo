import type { RecentRecipesResponseDto } from "@/dto/response/recentRecipes.response.dto";

import { richFetch } from "@/utils/fetch.utils.ts";

type Params = {
  pageParam: number;
};

export async function getRecentRecipesApi({
  pageParam,
}: Params): Promise<RecentRecipesResponseDto> {
  const data = await richFetch<RecentRecipesResponseDto>(
    `/recipe/recent?page=${pageParam}`,
  );

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
