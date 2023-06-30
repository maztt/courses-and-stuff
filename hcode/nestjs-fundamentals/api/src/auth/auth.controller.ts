import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthForgotPasswordDTO } from "src/user/dto/auth-forgot-password.dto";
import { AuthLoginDTO } from "src/user/dto/auth-login.dto";
import { AuthRegisterDTO } from "src/user/dto/auth-register.dto";
import { AuthResetPasswordDTO } from "src/user/dto/auth-reset-password.dto";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from 'src/decorators/user.decorator'


@Controller('auth')
export class AuthController {

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
    ) {}

  @Post('login')
  async login(@Body() { email, password }: AuthLoginDTO) {
    return this.authService.login(email, password)
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body)
  }

  @Post('forgotpassword')
  async forgotPassword(@Body() { email }: AuthForgotPasswordDTO) {
    return this.authService.forgotPassword(email)
  }

  @Post('reset')
  async resetPassword(@Body() { password, token }: AuthResetPasswordDTO) {
    return this.authService.resetPassword(password, token)
  }

  @UseGuards(AuthGuard)
  @Post('tester')
  async tester(@User() user) {
    return {
      user
    }
  }
}