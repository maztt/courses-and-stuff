import { Controller, Get, Post, Body, Param, Put, Patch, Delete, UseInterceptors, UseGuards } from '@nestjs/common'
import { CreateUserDTO } from './dto/create-user.dto'
import { UpdatePutUserDTO } from './dto/update-put-user.dto'
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto'
import { UserService } from './user.service'
import { LogInterceptor } from '../interceptors/log.interceptor'
import { ParamId } from 'src/decorators/param-id.decorator'
import { Roles } from 'src/decorators/roles.decorator'
import { Role } from 'src/enums/role.enum'
import { RoleGuard } from 'src/guards/role.guard'
import { AuthGuard } from 'src/guards/auth.guard'
import { SkipThrottle, Throttle } from '@nestjs/throttler'

@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Throttle(5, 360)
  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data)
  }

  @SkipThrottle()
  @Get()
  async read() {
    return this.userService.read()
  }

  @Roles(Role.Admin, Role.User)
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

  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@ParamId() id: number) {
    return this.userService.delete(id)
  }
}