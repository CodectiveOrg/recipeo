export type PaginatedResponseDto<T> = {
  items: T[];
  currentPage: number;
  lastPage: number;
};
