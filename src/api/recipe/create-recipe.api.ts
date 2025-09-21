import type { CreateRecipeResponseDto } from "@/dto/response/create-recipe.response.dto.ts";

import { richFetch } from "@/utils/fetch.utils.ts";

export async function createRecipeApi(
  formData: FormData,
): Promise<CreateRecipeResponseDto> {
  const data = await richFetch<CreateRecipeResponseDto>("/recipe", {
    method: "POST",
    body: formData,
  });

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
