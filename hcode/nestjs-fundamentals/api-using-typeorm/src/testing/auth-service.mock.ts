import { AuthService } from '../auth/auth.service';
import { jwtPayloadMock } from './jwt-payload.mock';
import { accessTokenMock } from './token.mock';

export const authServiceMock = {
  provide: AuthService,
  useValue: {
    createToken: jest.fn().mockReturnValue({ accessToken: accessTokenMock }),
    checkToken: jest.fn().mockReturnValue(jwtPayloadMock),
    isValidToken: jest.fn().mockReturnValue(true),
    login: jest.fn().mockResolvedValue({ accessToken: accessTokenMock }),
    forgotPassword: jest.fn().mockResolvedValue(true),
    resetPassword: jest
      .fn()
      .mockResolvedValue({ accessToken: accessTokenMock }),
    register: jest.fn().mockResolvedValue({ accessToken: accessTokenMock }),
  },
};
