import { ILoginRequest } from './i-login-request.interface';

export interface IRegisterRequest extends ILoginRequest {
  confirmPassword: string;
}
