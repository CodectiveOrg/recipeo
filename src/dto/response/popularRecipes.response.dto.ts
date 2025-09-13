import type { Recipe } from "@/entities/recipe";

import type { PaginatedResponseDto } from "./pagination.response.dto";

export type GetPopularRecipesResponseDto = PaginatedResponseDto<Recipe>;
