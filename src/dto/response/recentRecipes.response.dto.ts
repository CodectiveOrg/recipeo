import type { Recipe } from "@/entities/recipe";

import type { PaginatedResponseDto } from "./paginated.response.dto";

export type RecentRecipesResponseDto = PaginatedResponseDto<Recipe>;
