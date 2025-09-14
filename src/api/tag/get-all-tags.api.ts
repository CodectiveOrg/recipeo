import type { GetAllTagsResponseDto } from "@/dto/response/get-all-tags.response.dto.ts";

import { richFetch } from "@/utils/fetch.utils.ts";

export async function getAllTagsApi(): Promise<GetAllTagsResponseDto> {
  const data = await richFetch<GetAllTagsResponseDto>("/tag");

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
