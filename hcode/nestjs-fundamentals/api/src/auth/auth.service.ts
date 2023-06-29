import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRegisterDTO } from 'src/user/dto/auth-register.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

  private issuer = 'login'
  private audience = 'users'

  constructor (
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly userService: UserService
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
        email,
        password
      }
    })
    if (!user) {
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

    // TO DO: Sending an email algorithm

    return true
  }

  async resetPassword(password: string, token: string) {
    // TO DO: If token == true, read user id

    const id = 0;
    const user = await this.prismaService.user.update({
      where: {
        id
      },
      data: {
        password
      }
    })
    return this.createToken(user)
  }

  async register(data: AuthRegisterDTO) {
    const user = await this.userService.create(data)
    return this.createToken(user)
  }

}