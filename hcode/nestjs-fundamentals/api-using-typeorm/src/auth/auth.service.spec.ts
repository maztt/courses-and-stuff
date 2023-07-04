import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service"
import { userRepositoryMock } from "../testing/user-repository.mock";
import { jwtServiceMock } from "../testing/jwt-service.mock";
import { mailerServiceMock } from "../testing/mailer-service.mock";
import { userServiceMock } from "../testing/user-service.mock";
import { userEntityList } from "../testing/user-entity-list.mock";
import { accessTokenMock } from "../testing/token.mock";
import { jwtPayloadMock } from "../testing/jwt-payload.mock";
import { userLoginMock } from "../testing/user-login.mock";
import { resetTokenMock } from "../testing/reset-token.mock";
import { AuthRegisterDTOMock } from "../testing/auth-register-dto.mock";

describe('AuthService', () => {

    let authService: AuthService
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                userRepositoryMock,
                jwtServiceMock,
                userServiceMock,
                mailerServiceMock
            ]
        }).compile()

        authService = module.get<AuthService>(AuthService)
    })

    it('Should validate if modules are defined', () => {
        expect(authService).toBeDefined();
    })

    describe('Tokenization', () => {
        it('Should validate if createToken method is working', () => {
            const result = authService.createToken(userEntityList[0])
            expect(result).toEqual({accessToken: accessTokenMock})
        })

        it('Should validate if checkToken method is working', () => {
            const result = authService.checkToken(accessTokenMock)
            expect(result).toEqual(jwtPayloadMock)
        })

        it('Should validate if isValidToken method is working', () => {
            const result = authService.isValidToken(accessTokenMock)
            expect(result).toEqual(true)
        })
    })

    describe('Authentication', () => {
        it('Should validate if login method is working', async () => {
            const result = await authService.login('userone@email.com',
            'userone')
            expect(result).toEqual({accessToken: accessTokenMock})
        })

        it('Should validate if forgotPassword method is working', async () => {
            const result = await authService.forgotPassword('userone@email.com')
            expect(result).toEqual(true)
        })

        it('Should validate if resetPassword method is working', async () => {
            const result = await authService.resetPassword('any_new_password', resetTokenMock)
            expect(result).toEqual({accessToken: accessTokenMock})
        })

        it('Should validate if register method is working', async () => {
            const result = await authService.register(AuthRegisterDTOMock)
            expect(result).toEqual({accessToken: accessTokenMock})
        })
    })
})