import { IsJWT } from 'class-validator';

export class AuthTesterDTO {
  @IsJWT()
  token: string;
}
