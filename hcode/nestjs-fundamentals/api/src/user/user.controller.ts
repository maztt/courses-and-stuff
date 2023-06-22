import { Controller, Get, Post, Body, Param, Put, Patch, Delete, ParseIntPipe } from '@nestjs/common'
import { CreateUserDTO } from './dto/create-user.dto'
import { UpdatePutUserDTO } from './dto/update-put-user.dto'
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create (@Body() data: CreateUserDTO) {
    return this.userService.create(data)
  }

  @Get()
  async read () {
    return this.userService.read()
  }

  @Get(':id')
  async readOne (@Param('id', ParseIntPipe) id: number) {
    return this.userService.readOne(id)
  }

  @Put(':id')
  async updateAllInfo (@Param('id', ParseIntPipe) id: number, @Body() data: UpdatePutUserDTO) {
    return this.userService.updateAllInfo(id, data)
  }

  @Patch(':id')
  async updateSomeInfo (@Param('id', ParseIntPipe) id: number, @Body() data: UpdatePatchUserDTO) {
    return this.userService.updateSomeInfo(id, data)
  }

  @Delete(':id')
  async delete (@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id)
  }
}