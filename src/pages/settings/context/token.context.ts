import { createContext } from "react";

import type { VerifyResponseDto } from "@/dto/response/verify.response.dto.ts";

type ContextValue = VerifyResponseDto;

export const TokenContext = createContext<ContextValue>({} as ContextValue);
