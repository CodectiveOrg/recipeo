import type { EditPictureRequestDto } from "@/dto/request/edit-picture.response.dto.ts";
import type { ResponseDto } from "@/dto/response/response.dto.ts";

import { richFetch } from "@/utils/fetch.utils.ts";

export async function updatePictureApi(
  dto: EditPictureRequestDto,
): Promise<ResponseDto> {
  return await richFetch("/profile/picture", {
    method: "POST",
    body: dto,
  });
}
