import { IResponsePagination } from '../interfaces/response-pagination.interface';
import { IResponse } from '../interfaces/response.interface';

// export class ResponsePagination implements IResponsePagination {
//   constructor(message: string, data: any[]) {}
// }

export class ResponseSuccess implements IResponse {
  info: { success: boolean; message: string; errorMessage: string; error: any };

  constructor(message: string, data: object | object[]) {
    this.info = {
      success: true,
      message: message,
      errorMessage: '',
      error: null
    };
    this.data = data;
  }
  data: object | object[];
}
