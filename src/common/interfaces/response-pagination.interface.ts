import { IResponse } from './response.interface';

export interface IResponsePagination extends IResponse {
  info: {
    success: boolean;
    message: string;
    errorMessage: string;
    error: any;
    totalCount: number;
    perPage: number;
    totalPages: number;
    currentPage: number;
    next: string | null;
    prev: string | null;
  };
}
