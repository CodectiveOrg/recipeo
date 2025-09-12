import type { GetTagsResponseDto } from "@/dto/response/get-tags.response.dto";

import { richFetch } from "@/utils/fetch.utils";

export async function getTagsApi(): Promise<GetTagsResponseDto> {
  const data = await richFetch<GetTagsResponseDto>("/recipe/tags");

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
