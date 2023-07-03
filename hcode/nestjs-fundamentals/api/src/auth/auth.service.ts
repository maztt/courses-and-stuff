import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRegisterDTO } from 'src/user/dto/auth-register.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { MailerService } from 'src/utils/mailer/mailer.service';

@Injectable()
export class AuthService {

  private issuer = 'login'
  private audience = 'users'

  constructor (
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly mailerService: MailerService
  ) {}

  createToken(user: User) {
    return {
      accessToken: this.jwtService.sign({
        id: user.id,
        email: user.email,
        password: user.password
      }, {
        expiresIn: "7 days",
        subject: String(user.id),
        issuer: this.issuer,
        audience: this.audience
      })
    }
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: this.issuer,
        audience: this.audience
      })
      return data
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token)
      return true
    } catch (error) {
      return false
    }
  }

  async login(email: string, password: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email
      }
    })

    if (!user) {
      throw new UnauthorizedException('User credentials are invalid.')
    }

    if (!await bcrypt.compare(password, user.password)) {
      throw new UnauthorizedException('User credentials are invalid.')
    }

    return this.createToken(user)
  }

  async forgotPassword(email: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email
      }
    })

    if (!user) {
      throw new UnauthorizedException('Email is invalid.')
    }

    const token = this.jwtService.sign({
      id: user.id
    }, {
      expiresIn: '10 minutes',
      subject: String(user.id),
      issuer: 'forget',
      audience: 'users'
    })

    await this.mailerService.sendEmail({
      from: '"CRUD Nest.js 👻" <crudnestjs@mail.com>', // sender address
      to: "user7@email.com, user7@email.com", // list of receivers
      subject: "Did you forget your password?", // Subject line
      text: `
      Hello, ${user.name}!

      We have received a password recovery request for your account. To reset your password, please use the token below:
      ${token}

      If you didn't initiate this request, please disregard this email. The security of your account is important to us.

      Best regards,
      Support Team
      `, // plain text body
      html: "<b>Hello world?</b>", // html body -> I can use Handlebars, Pug aswell.
    })

    return true
  }

  async resetPassword(password: string, token: string) {
    try {

      const data: any = this.jwtService.verify(token, {
        issuer: 'forget',
        audience: 'users'
      })

      if (isNaN(Number(data.id))) {
        throw new BadRequestException('Invalid token.')
      }

      const salt = await bcrypt.genSalt()
      password = await bcrypt.hash(password, salt)

      const user = await this.prismaService.user.update({
        where: {
          id: Number(data.id)
        },
        data: {
          password
        }
      })
      return this.createToken(user)
    } catch (error) {
      throw new BadRequestException(error)
    }

  }

  async register(data: AuthRegisterDTO) {
    const user = await this.userService.create(data)
    return this.createToken(user)
  }

}