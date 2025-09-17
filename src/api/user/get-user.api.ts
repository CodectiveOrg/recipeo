import type { GetUserResponseDto } from "@/dto/response/get-user.response.dto.ts";

import { richFetch } from "@/utils/fetch.utils";

type Params = {
  userId: string | undefined;
};

export async function getUserApi({
  userId,
}: Params): Promise<GetUserResponseDto> {
  const data = await richFetch<GetUserResponseDto>(`/user/${userId}`);

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
