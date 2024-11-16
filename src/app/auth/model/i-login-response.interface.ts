import { IViewUser } from '../../core/model/i-view-user.interface';

export interface ILoginResponse extends IViewUser {
  accessToken: string;
}
