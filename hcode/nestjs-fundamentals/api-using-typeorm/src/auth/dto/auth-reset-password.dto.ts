import { IsJWT, IsString } from 'class-validator';

export class AuthResetPasswordDTO {
  @IsString()
  password: string;

  @IsJWT()
  token: string;
}
