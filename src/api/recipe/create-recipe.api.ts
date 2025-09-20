import type { CreateRecipeRequestDto } from "@/dto/request/create-recipe.request.dto.ts";
import type { ResponseDto } from "@/dto/response/response.dto.ts";

import { richFetch } from "@/utils/fetch.utils.ts";

export async function createRecipeApi(
  dto: CreateRecipeRequestDto,
): Promise<ResponseDto> {
  return richFetch("/recipe", {
    method: "POST",
    body: JSON.stringify(dto),
  });
}
