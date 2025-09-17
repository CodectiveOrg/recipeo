import type { ResponseDto } from "@/dto/response/response.dto";

import { richFetch } from "@/utils/fetch.utils";

type Params = {
  targetUserId: number | undefined;
  action: "follow" | "unfollow";
};

export async function FollowUserApi({
  targetUserId,
  action,
}: Params): Promise<ResponseDto> {
  return richFetch(`/user/${targetUserId}/${action}`, {
    method: "POST",
  });
}
