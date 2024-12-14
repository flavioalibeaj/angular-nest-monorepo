export interface IApiResponse<T = unknown> {
  statusCode: number;
  isSuccessful: boolean;
  data?: T;
  error?: T;
}
