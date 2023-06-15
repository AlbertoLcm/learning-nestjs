import { IResponsePagination } from '../interfaces/response-pagination.interface';
import { IResponse } from '../interfaces/response.interface';

// export class ResponseSuccess implements IResponse {
//   constructor(message: string, data: object | object[]) {
//     this.info = {
//       success: true,
//       message: message,
//       errorMessage: '',
//       error: null
//     };
//     this.data = data;
//   }
//   info: { success: boolean; message: string; errorMessage: string; error: any };
//   data: object | object[];
// }

export class ResponseSuccess<T> implements IResponse<T> {
  constructor(message: string, data: T) {
    this.success = true;
    this.message = message;
    this.errorMessage = '';
    this.error = null;
    this.data = data;
  }
  public readonly success: boolean;
  public readonly errorMessage: string;
  public readonly error: any;
  public readonly message: string;
  public readonly data: T;
}

export class ResponsePagination {
  constructor(
    public readonly info: IResponsePagination, 
    public readonly data: object[]
  ) {}
}
