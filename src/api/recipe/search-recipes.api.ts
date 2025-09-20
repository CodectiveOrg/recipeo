import type { SearchRecipesResponseDto } from "@/dto/response/search-recipes.response.dto";

import { richFetch } from "@/utils/fetch.utils";

export async function searchRecipesApi(
  queryString: string,
): Promise<SearchRecipesResponseDto> {
  const data = await richFetch<SearchRecipesResponseDto>(
    `/recipe/search?${queryString}`,
  );

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
