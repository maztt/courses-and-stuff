import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {

  constructor (
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService
  ) {}

  async createToken() {
    // return this.jwtService.sign();
  }

  async checkToken(token: string) {
    // return this.jwtService.verify(token)
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
    return user
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

    await this.prismaService.user.update({
      where: {
        id
      },
      data: {
        password
      }
    })
    
    return true
  }

}