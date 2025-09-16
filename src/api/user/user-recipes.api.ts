import type { PaginatedRecipesResponseDto } from "@/dto/response/paginated-recipes.response.dto.ts";

import { richFetch } from "@/utils/fetch.utils";

type Params = {
  userId: number | undefined;
};

export async function UserRecipesApi({
  userId,
}: Params): Promise<PaginatedRecipesResponseDto> {
  const data = await richFetch<PaginatedRecipesResponseDto>(
    `/recipe/user/${userId}`,
  );

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
