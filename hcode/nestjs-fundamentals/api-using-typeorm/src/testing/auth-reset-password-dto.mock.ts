import { AuthResetPasswordDTO } from '../auth/dto/auth-reset-password.dto';
import { resetTokenMock } from './reset-token.mock';

export const authResetPasswordDTOMock: AuthResetPasswordDTO = {
  password: 'any_new_password',
  token: resetTokenMock,
};
