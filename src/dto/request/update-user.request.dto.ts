import type { User } from "@/entities/user.ts";

export type UpdateUserRequestDto = Pick<
  User,
  "username" | "password" | "email"
>;
