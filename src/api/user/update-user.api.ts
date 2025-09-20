import type { UpdateUserRequestDto } from "@/dto/request/update-user.request.dto";
import type { ResponseDto } from "@/dto/response/response.dto.ts";

import { richFetch } from "@/utils/fetch.utils.ts";

type Params = {
  user?: UpdateUserRequestDto;
  file?: FormData;
};

export async function updateUserApi({
  user,
  file,
}: Params): Promise<ResponseDto> {
  return await richFetch("/user/", {
    method: "PATCH",
    body: file ? file : JSON.stringify(user),
  });
}
