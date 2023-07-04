import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import * as bcrypt from 'bcrypt'
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) { }

  async create(data: CreateUserDTO) {
      if (await this.usersRepository.exist({
        where: {
          email: data.email
        }
      })) {
        throw new BadRequestException('The email is already in use.')
      }

      data.password = await bcrypt.hash(data.password, await bcrypt.genSalt())
      const user = this.usersRepository.create(data)
      return this.usersRepository.save(user)
  }

  async read() {
    return this.usersRepository.find()
  }

  async readOne(id: number) {
    await this.exists(id)
    return this.usersRepository.findOneBy({
      id
    })
  }

  async updateAllInfo(id: number, body: UpdatePutUserDTO) {

    await this.exists(id)

    body.password = await bcrypt.hash(body.password, await bcrypt.genSalt())

    await this.usersRepository.update(id, {
        name: body.name,
        email: body.email,
        password: body.password,
        role: body.role
    })

    return this.readOne(id)
  }

  async updateSomeInfo(id: number, body: UpdatePatchUserDTO) {

    await this.exists(id)

    if (body.password) {
      body.password = await bcrypt.hash(body.password, await bcrypt.genSalt())
    }

    await this.usersRepository.update(id, {
      name: body.name,
      email: body.email,
      password: body.password,
      role: body.role
    })

    return this.readOne(id)
  }

  async delete(id: number) {
    await this.exists(id)
    await this.usersRepository.delete(id)
    return true
  }

  async exists(id: number) {
    if (!(await this.usersRepository.exist({
      where: {
        id
      }
    }))) {
      throw new NotFoundException(`User with ID ${id} not found!`)
    }
  }
}