import { ERole } from './role/role.enum';

export interface IJwtPayload {
  id: string;
  role: ERole;
  name?: string;
}
