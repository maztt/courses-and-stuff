import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreateUserDTO) {
    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt())
    return this.prisma.user.create({
      data
    })
  }

  async read() {
    return this.prisma.user.findMany()
  }

  async readOne(id: number) {
    await this.exists(id)
    return this.prisma.user.findUnique({
      where: {
        id
      }
    })
  }

  async updateAllInfo(id: number, body: UpdatePutUserDTO) {

    await this.exists(id)

    body.password = await bcrypt.hash(body.password, await bcrypt.genSalt())

    return this.prisma.user.update({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
        role: body.role
      },
      where: {
        id
      }
    })
  }

  async updateSomeInfo(id: number, body: UpdatePatchUserDTO) {

    await this.exists(id)

    if (body.password) {
      body.password = await bcrypt.hash(body.password, await bcrypt.genSalt())
    }

    return this.prisma.user.update({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
        role: body.role
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
    if (!(await this.prisma.user.count({
      where: {
        id
      }
    }))) {
      throw new NotFoundException(`User with ID ${id} not found!`)
    }
  }
}