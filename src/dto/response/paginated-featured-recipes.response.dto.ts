import type { FeaturedRecipe } from "@/entities/featured-recipe.ts";

import type { Paginated } from "@/types/paginated.type.ts";

export type PaginatedFeaturedRecipesResponseDto = Paginated<FeaturedRecipe>;
