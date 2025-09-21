import type { ResponseDto } from "@/dto/response/response.dto.ts";

import { richFetch } from "@/utils/fetch.utils.ts";

export async function createRecipeApi(
  formData: FormData,
): Promise<ResponseDto> {
  return richFetch("/recipe", {
    method: "POST",
    body: formData,
  });
}
