import type { Recipe } from "@/entities/recipe";

import type { Paginated } from "@/types/paginated.type.ts";

export type PaginatedRecipesResponseDto = Paginated<Recipe>;
