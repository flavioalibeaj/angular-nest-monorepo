export interface IApiResponse<T> {
  statusCode: number;
  isSuccessful: boolean;
  data?: T;
  error?: T;
}
