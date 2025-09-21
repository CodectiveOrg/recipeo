import type { ResponseDto } from "@/dto/response/response.dto.ts";

import { richFetch } from "@/utils/fetch.utils.ts";

export async function updateUserApi(formData: FormData): Promise<ResponseDto> {
  return await richFetch("/user/", {
    method: "PATCH",
    body: formData,
  });
}
