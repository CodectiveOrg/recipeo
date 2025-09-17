import type { SearchRequestDto } from "@/dto/request/search.request.dto.ts";

export function generateSearchUrl(dto: SearchRequestDto): string {
  const params = new URLSearchParams();

  if (dto.query) {
    params.append("query", dto.query);
  }

  if (dto.tag) {
    params.append("tag", dto.tag);
  }

  if (dto.maxDuration) {
    params.append("maxDuration", dto.maxDuration.toString());
  }

  return `/search?${params.toString()}`;
}
