import type { ResponseDto } from "@/dto/response/response.dto";

import { richFetch } from "@/utils/fetch.utils";

export async function unlikeRecipeApi(id: number): Promise<ResponseDto> {
  return await richFetch(`/${id}/like`, {
    method: "DELETE",
  });
}
