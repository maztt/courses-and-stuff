import { BadRequestException, Body, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthForgotPasswordDTO } from "src/user/dto/auth-forgot-password.dto";
import { AuthLoginDTO } from "src/user/dto/auth-login.dto";
import { AuthRegisterDTO } from "src/user/dto/auth-register.dto";
import { AuthResetPasswordDTO } from "src/user/dto/auth-reset-password.dto";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from 'src/decorators/user.decorator'
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { join } from "path";
import { FileService } from "src/file/file.service";


@Controller('auth')
export class AuthController {

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly fileService: FileService
  ) { }

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

  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  @Post('photo')
  async uploadPhoto(@User() user, @UploadedFile(new ParseFilePipe({
    validators: [
      new FileTypeValidator({ fileType: 'image/png' }),
      new MaxFileSizeValidator({maxSize: 1024 * 1000})
    ]
  })) file: Express.Multer.File) {

    const path = join(__dirname, '..', '..', 'storage', 'photos', `photo-${user.id}.png`)

    try {
      await this.fileService.upload(file, path)
    } catch (error) {
      throw new BadRequestException(error)
    }

    return { success: true }
  }

  @UseInterceptors(FilesInterceptor('files'))
  @UseGuards(AuthGuard)
  @Post('files')
  async uploadFiles(@User() user, @UploadedFiles() files: Express.Multer.File[]) {
    return files
  }

  @UseInterceptors(FileFieldsInterceptor([{
    name: 'photo',
    maxCount: 1
  }, {
    name: 'documents',
    maxCount: 10
  }]))
  @UseGuards(AuthGuard)
  @Post('files-fields')
  async uploadFileFields(@User() user, @UploadedFiles() files: { photo: Express.Multer.File, documents: Express.Multer.File[] }) {
    return files
  }
}