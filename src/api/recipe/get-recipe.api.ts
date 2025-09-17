import type { GetRecipeResponseDto } from "@/dto/response/get-recipe.response.dto.ts";

import { richFetch } from "@/utils/fetch.utils";

type Params = {
  recipeId: string | undefined;
};

export async function getRecipeApi({
  recipeId,
}: Params): Promise<GetRecipeResponseDto> {
  const data = await richFetch<GetRecipeResponseDto>(`/recipe/${recipeId}`);

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
