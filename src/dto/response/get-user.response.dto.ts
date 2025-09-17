import type { User } from "@/entities/user.ts";

export type GetUserResponseDto = User & {
  isFollowedByCurrentUser: boolean;
};
