export interface PaginationInfo {
  currentPage: number;
  perPage: number;
  totalPages: number;
  totalCount: number;
  next: string | null;
  prev: string | null;
}