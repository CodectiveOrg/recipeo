import { searchFilters } from "@/configs/search-filters.config.ts";

import type { SearchRequestDto } from "@/dto/request/search.request.dto.ts";

export function formatDuration(value: number): string {
  if (value < 60) {
    return `${value} Min`;
  }

  const hours = Math.floor(value / 60);
  const minutes = value - 60 * hours;

  return `${pad2(hours)}:${pad2(minutes)}`;
}

export function pad2(value: number | string): string {
  return value.toString().padStart(2, "0");
}

export function formatSearchTitle(params: SearchRequestDto): string {
  const currentFilters = searchFilters.filter(
    (filter) =>
      params[filter.key] && params[filter.key] !== filter.defaultValue,
  );

  const titles = currentFilters.map(
    (filter) => `${params[filter.key]}${filter.valueSuffix ?? ""}`,
  );

  return titles.join(" - ");
}
