import { IsString, IsEmail } from "class-validator"

export class AuthLoginDTO {
  @IsEmail()
  email: string

  @IsString()
  password: string
}