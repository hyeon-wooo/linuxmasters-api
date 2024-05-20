import { ERole } from './role/role.enum';

export interface IJwtPayload {
  id: string;
  level: number;
  role: ERole;
  name?: string;
}
