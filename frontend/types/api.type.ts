export interface IApiResponse<T = any> {
  statusCode: number;
  message: string;
  data: T;
  success: boolean;
  errors: any[];
}


