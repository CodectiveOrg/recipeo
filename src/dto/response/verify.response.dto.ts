import type { User } from "@/entities/user.ts";

export type VerifyResponseDto = Pick<User, "username" | "email" | "id">;
