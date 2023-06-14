export interface IResponse {
  info: {
    success: boolean;
    message: string;
    errorMessage: string;
    error: any;
  };
  data: object | object[];
}
