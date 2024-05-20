import { EIspKind } from './user.enum';

/** body: /user/signin */
export class SignInBodyDTO {
  isp: EIspKind;
  ispId: string;
}
