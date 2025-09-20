import {
  maxDurationFilter,
  phraseFilter,
  tagFilter,
} from "@/configs/search-filters.config.ts";

import type { SearchRequestDto } from "@/dto/request/search.request.dto.ts";

export function generateSearchUrl(dto: SearchRequestDto): string {
  const params = new URLSearchParams();

  if (dto.phrase && dto.phrase !== phraseFilter.defaultValue) {
    params.append("phrase", dto.phrase);
  }

  if (dto.tag && dto.tag !== tagFilter.defaultValue) {
    params.append("tag", dto.tag);
  }

  if (dto.maxDuration && dto.maxDuration !== maxDurationFilter.defaultValue) {
    params.append("maxDuration", dto.maxDuration.toString());
  }

  return params.toString();
}
