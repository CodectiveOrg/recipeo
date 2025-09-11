import type { GetEditorsChoiceResponseDto } from "@/dto/response/get-editors-choice.response.dto";

import { richFetch } from "@/utils/fetch.utils";

export async function getChosenApi(): Promise<GetEditorsChoiceResponseDto[]> {
  const data = await richFetch<GetEditorsChoiceResponseDto[]>("/recipe/chosen");

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
