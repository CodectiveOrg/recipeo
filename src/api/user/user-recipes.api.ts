import type { Recipe } from "@/entities/recipe";

import { richFetch } from "@/utils/fetch.utils";

type Params = {
  profileId: string;
};

export async function UserRecipesApi({ profileId }: Params): Promise<Recipe[]> {
  const data = await richFetch<Recipe[]>(`/user/${profileId}/recipes`);

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
