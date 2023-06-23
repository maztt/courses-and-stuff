import { Controller, Get, Post, Body, Param, Put, Patch, Delete, ParseIntPipe, UseInterceptors } from '@nestjs/common'
import { CreateUserDTO } from './dto/create-user.dto'
import { UpdatePutUserDTO } from './dto/update-put-user.dto'
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto'
import { UserService } from './user.service'
import { LogInterceptor } from '../interceptors/log.interceptor'
import { ParamId } from 'src/decorators/param-id.decorator'

@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data)
  }

  @Get()
  async read() {
    return this.userService.read()
  }

  @Get(':id')
  async readOne(@ParamId() id: number) {
    return this.userService.readOne(id)
  }

  @Put(':id')
  async updateAllInfo(@ParamId() id: number, @Body() data: UpdatePutUserDTO) {
    return this.userService.updateAllInfo(id, data)
  }

  @Patch(':id')
  async updateSomeInfo(@ParamId() id: number, @Body() data: UpdatePatchUserDTO) {
    return this.userService.updateSomeInfo(id, data)
  }

  @Delete(':id')
  async delete(@ParamId() id: number) {
    return this.userService.delete(id)
  }
}