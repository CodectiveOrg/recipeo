import type { GetUserPictureResponseDto } from "@/dto/response/get-user-picture.response.dto";

import { richFetch } from "@/utils/fetch.utils";

type Params = {
  filename: string;
};

export async function getUserPictureApi({
  filename,
}: Params): Promise<GetUserPictureResponseDto> {
  const data = await richFetch<GetUserPictureResponseDto>(
    `/public/picture/user/${filename}`,
  );

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
