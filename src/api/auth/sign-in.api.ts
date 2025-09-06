import type { AuthRequestDto } from "@/dto/request/auth.request.dto.ts";
import type { ResponseDto } from "@/dto/response/response.dto.ts";

import { richFetch } from "@/utils/fetch.utils.ts";

export async function signInApi(dto: AuthRequestDto): Promise<ResponseDto> {
  return await richFetch("/auth/sign-in", {
    method: "POST",
    body: JSON.stringify(dto),
  });
}
