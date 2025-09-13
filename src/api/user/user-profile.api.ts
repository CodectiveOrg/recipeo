import type { User } from "@/entities/user";

import { richFetch } from "@/utils/fetch.utils";

type Params = {
  profileId: string;
};

export async function UserProfileApi({ profileId }: Params): Promise<User> {
  const data = await richFetch<User>(`/user/${profileId}`);

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
