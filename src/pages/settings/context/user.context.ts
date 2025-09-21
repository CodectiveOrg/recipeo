import { createContext } from "react";

import type { GetUserResponseDto } from "@/dto/response/get-user.response.dto.ts";

type ContextValue = GetUserResponseDto;

export const UserContext = createContext<ContextValue>({} as ContextValue);
