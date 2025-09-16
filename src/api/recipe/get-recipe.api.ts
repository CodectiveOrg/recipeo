import type { RecipeResponseDto } from "@/dto/response/recipe.response.dto";

import { richFetch } from "@/utils/fetch.utils";

type Params = {
  recipeId: string | undefined;
};

export async function getRecipeApi({
  recipeId,
}: Params): Promise<RecipeResponseDto> {
  const data = await richFetch<RecipeResponseDto>(`/recipe/${recipeId}`);

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
