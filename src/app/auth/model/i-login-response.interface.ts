import { IRegisterResponse } from './i-register-response.interface';

export interface ILoginResponse extends IRegisterResponse {
  accessToken: string;
}
