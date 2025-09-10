import type { ResponseDto } from "@/dto/response/response.dto";

import { richFetch } from "@/utils/fetch.utils";

type Params = {
  id: number;
  action: "like" | "unlike";
};

export async function likeRecipeApi({
  id,
  action,
}: Params): Promise<ResponseDto> {
  return await richFetch(`/${id}/like`, {
    method: action === "like" ? "POST" : "DELETE",
  });
}
