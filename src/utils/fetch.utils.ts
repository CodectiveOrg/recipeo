import type { ResponseDto } from "@/dto/response/response.dto.ts";

export async function richFetch<TResult = void>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<ResponseDto<TResult>> {
  const [response, data] = await fetchWithAutoRefreshToken<TResult>(
    input,
    init,
  );

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

async function fetchWithAutoRefreshToken<TResult = void>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<[Response, ResponseDto<TResult>]> {
  const [response, data] = await tryToFetch<TResult>(input, init);

  if (!response.ok) {
    if (response.status === 401 && data.message === "Unauthorized") {
      const [refreshResponse, refreshData] =
        await tryToFetch<TResult>("/auth/refresh");

      if (refreshResponse.ok) {
        return await tryToFetch<TResult>(input, init);
      }

      return [refreshResponse, refreshData];
    }
  }

  return [response, data];
}

async function tryToFetch<TResult = void>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<[Response, ResponseDto<TResult>]> {
  if (!init) {
    init = {};
  }

  init = {
    credentials: "include",
    ...init,
  };

  if (typeof init.body === "string") {
    init.headers = {
      "Content-Type": "application/json",
      ...init.headers,
    };
  }

  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}${input}`,
    init,
  );

  const data = await response.json();

  return [response, data];
}
