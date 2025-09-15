import type { ResponseDto } from "@/dto/response/response.dto";

import { richFetch } from "@/utils/fetch.utils";

type Params = {
  targetUserId: number | undefined;
};

export async function UserUnFollowApi({
  targetUserId,
}: Params): Promise<ResponseDto> {
  const data = await richFetch<ResponseDto>(`/user/unfollow/${targetUserId}`);

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
