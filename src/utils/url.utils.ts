import type { SearchRequestDto } from "@/dto/request/search.request.dto.ts";

export function generateSearchUrl(dto: SearchRequestDto): string {
  const params = new URLSearchParams();

  if (dto.phrase) {
    params.append("phrase", dto.phrase);
  }

  if (dto.tag && dto.tag !== "all") {
    params.append("tag", dto.tag);
  }

  if (dto.maxDuration && dto.maxDuration < 60) {
    params.append("maxDuration", dto.maxDuration.toString());
  }

  return params.toString();
}
