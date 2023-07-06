import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { authServiceMock } from '../testing/auth-service.mock';
import { fileServiceMock } from '../testing/file-service.mock';
import { AuthGuard } from '../guards/auth.guard';
import { guardMock } from '../testing/guard.mock';
import { authLoginDTOMock } from '../testing/auth-login-dto.mock';
import { accessTokenMock } from '../testing/token.mock';
import { AuthRegisterDTOMock } from '../testing/auth-register-dto.mock';
import { authForgotPasswordDTOMock } from '../testing/auth-forgot-password-dto.mock';
import { authResetPasswordDTOMock } from '../testing/auth-reset-password-dto.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { getPhotoMock } from '../testing/get-photo.mock';

describe('AuthController', () => {
  let authController: AuthController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [authServiceMock, fileServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('Should validate if modules are defined', () => {
    expect(authController).toBeDefined();
  });

  describe('Authentication', () => {
    it('Should validate if login method is working', async () => {
      const result = await authController.login(authLoginDTOMock);
      expect(result).toEqual({ accessToken: accessTokenMock });
    });

    it('Should validate if register method is working', async () => {
      const result = await authController.register(AuthRegisterDTOMock);
      expect(result).toEqual({ accessToken: accessTokenMock });
    });

    it('Should validate if forgotPassword method is working', async () => {
      const result = await authController.forgotPassword(
        authForgotPasswordDTOMock,
      );
      expect(result).toEqual(true);
    });

    it('Should validate if resetPassword method is working', async () => {
      const result = await authController.resetPassword(
        authResetPasswordDTOMock,
      );
      expect(result).toEqual({ accessToken: accessTokenMock });
    });
  });

  describe('Authenticated routes', () => {
    it('Should validate if tester route is working', async () => {
      const result = await authController.tester(userEntityList[0]);
      expect(result).toEqual(userEntityList[0]);
    });

    it('Should validate if uploadPhoto route is working', async () => {
      const photo = await getPhotoMock();
      const result = await authController.uploadPhoto(userEntityList[0], photo);
      expect(result).toEqual(photo);
    });
  });
});
