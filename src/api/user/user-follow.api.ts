import type { ResponseDto } from "@/dto/response/response.dto";
import type { VerifyResponseDto } from "@/dto/response/verify.response.dto";

import type { User } from "@/entities/user";

import { richFetch } from "@/utils/fetch.utils";

type Params = {
  verifyId: VerifyResponseDto;
};

export async function UserFollowApi({
  verifyId,
}: Params): Promise<ResponseDto<User>> {
  const data = await richFetch<ResponseDto<User>>(`/user/follow/${verifyId}`);

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
