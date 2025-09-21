import { z } from "zod";

export const EmailSchema = z.preprocess(
  (val) => (val === "" ? undefined : val),
  z.email("Email must be a valid email address.").optional(),
);
