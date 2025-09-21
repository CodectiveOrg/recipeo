import { z } from "zod";

import { EmailSchema } from "@/validation/schemas/user/email.schema.ts";
import { PasswordSchema } from "@/validation/schemas/user/password.schema.ts";
import { UsernameSchema } from "@/validation/schemas/user/username.schema.ts";

export const SettingsSchema = z.object({
  picture: z.union([
    z.string().nullable(),
    z.file("Please upload a valid jpg, png or webp image."),
  ]),
  username: UsernameSchema.optional(),
  email: EmailSchema.optional(),
  currentPassword: z.string().optional(),
  newPassword: PasswordSchema.optional(),
});

export type SettingsType = z.infer<typeof SettingsSchema>;
