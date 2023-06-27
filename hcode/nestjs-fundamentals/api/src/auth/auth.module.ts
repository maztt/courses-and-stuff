import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      secret: "UShouldUseASctWithAtL3ast32Ch4rs"
    }),
    UserModule,
    PrismaService
  ],
  controllers: [AuthController],
  providers: [],
  exports: []

})
export class AuthModule { }