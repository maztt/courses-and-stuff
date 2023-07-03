import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class CreateUserDTO {

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string

  @IsOptional()
  @IsEnum(Role)
  role: number
}