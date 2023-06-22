import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { PrismaService } from './prisma/prisma.service';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ email, name, password }: CreateUserDTO) {
    return this.prisma.user.create({
      data: {
        email,
        name,
        password
      }
    })
  }

  async read() {
    return this.prisma.user.findMany()
  }

  async readOne(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id
      }
    })
  }

  async updateAllInfo(id: number, body: UpdatePutUserDTO) {

    // Missing NotFoundException

    return this.prisma.user.update({
      data: {
        name: body.name,
        email: body.email,
        password: body.password
      },
      where: {
        id
      }
    })
  }

  async updateSomeInfo(id: number, body: UpdatePatchUserDTO) {

    // Missing NotFoundException

    return this.prisma.user.update({
      data: {
        name: body.name,
        email: body.email,
        password: body.password
      },
      where: {
        id
      }
    })
  }

  async delete(id: number) {
    if (await this.readOne(id)) {
      return this.prisma.user.delete({
        where: {
          id
        }
      })
    } else {
      throw new NotFoundException(`User with ${id} not found!`)
    }
  }  

  async exists(id: number) {
    if (!(await this.readOne(id))) {
      throw new NotFoundException(`User with ${id} not found!`)
    }
  }
}