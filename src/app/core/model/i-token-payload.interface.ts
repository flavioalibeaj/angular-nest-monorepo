import { UserRole } from './user-role.enum';

export interface ITokenPayload {
  exp: number;
  iat: number;
  profileId: null | string;
  role: UserRole;
  sub: string;
  username: string;
}
