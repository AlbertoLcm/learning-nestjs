import { PaginationInfo } from "./pagination-info.interface";

export class PaginatedResponse<T> {
  constructor(
    public readonly info: PaginationInfo,
    public readonly data: T[],
  ) {}
}
