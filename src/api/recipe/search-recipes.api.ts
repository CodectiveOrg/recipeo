import type { SearchRequestDto } from "@/dto/request/search.request.dto";
import type { SearchRecipesResponseDto } from "@/dto/response/search-recipes.response.dto";

import { richFetch } from "@/utils/fetch.utils";
import { generateSearchUrl } from "@/utils/url.utils";

export async function searchRecipesApi(
  params: SearchRequestDto,
): Promise<SearchRecipesResponseDto> {
  const searchUrl = generateSearchUrl(params);

  const data = await richFetch<SearchRecipesResponseDto>(`/recipe${searchUrl}`);

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
