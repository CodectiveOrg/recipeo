import type { UpdateUserRequestDto } from "@/dto/request/update-user.response.dto.ts";
import type { ResponseDto } from "@/dto/response/response.dto.ts";

import { richFetch } from "@/utils/fetch.utils.ts";

export async function updateUserApi(
  dto: UpdateUserRequestDto,
): Promise<ResponseDto> {
  return await richFetch("/user/", {
    method: "PATCH",
    body: JSON.stringify(dto),
  });
}
