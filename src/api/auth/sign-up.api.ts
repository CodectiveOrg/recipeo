import type { AuthRequestDto } from "@/dto/request/auth.request.dto.ts";
import type { ResponseDto } from "@/dto/response/response.dto.ts";

import { richFetch } from "@/utils/fetch.utils.ts";

export async function signUpApi(dto: AuthRequestDto): Promise<ResponseDto> {
  return await richFetch("/auth/sign-up", {
    method: "POST",
    body: JSON.stringify(dto),
  });
}
