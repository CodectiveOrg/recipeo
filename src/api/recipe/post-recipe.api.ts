import type { RecipeRequestDto } from "@/dto/request/resipe.request.dto";
import type { ResponseDto } from "@/dto/response/response.dto.ts";

import { richFetch } from "@/utils/fetch.utils.ts";

export async function postRecipeApi(
  dto: RecipeRequestDto,
): Promise<ResponseDto> {
  return richFetch("/recipe/", {
    method: "POST",
    body: JSON.stringify(dto),
  });
}
