import { Module, forwardRef } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FileModule } from 'src/file/file.module';
import { MailerModule } from 'src/utils/mailer/mailer.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET
    }),
    forwardRef(() => UserModule),
    PrismaModule,
    FileModule,
    MailerModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]

})
export class AuthModule { }