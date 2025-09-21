import type { GetUserResponseDto } from "@/dto/response/get-user.response.dto.ts";

import { richFetch } from "@/utils/fetch.utils";

export async function getUserApi(id: number): Promise<GetUserResponseDto> {
  const data = await richFetch<GetUserResponseDto>(`/user/${id}`);

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
