import { Controller, Get, Post, Body, Param, Put, Patch, Delete, ParseIntPipe } from '@nestjs/common'
import { CreateUserDTO } from './dto/create-user.dto'
import { UpdatePutUserDTO } from './dto/update-put-user.dto'
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto'

@Controller('users')
export class UserController {

  @Post()
  async create (@Body() { name, email, password }: CreateUserDTO) {
    return { name, email, password }
  }

  @Get()
  async read () {
    return { users: [] }
  }

  @Get(':id')
  async readOne (@Param('id', ParseIntPipe) id: number) {
    return { user: {}, id }
  }

  @Put(':id')
  async updateAllInfo (@Param('id', ParseIntPipe) id: number, @Body() { name, email, password }: UpdatePutUserDTO) {
    return { 
      method: 'The method used here was PUT',
      name,
      email,
      password,
      id
     }
  }

  @Patch(':id')
  async updateSomeInfo (@Param('id', ParseIntPipe) id: number, @Body() { name, email, password }: UpdatePatchUserDTO) {
    return {
      method: 'The method used here was PATCH',
      name, 
      email, 
      password,
      id
    }
  }

  @Delete(':id')
  async delete (@Param('id', ParseIntPipe) id: number) {
    return {
      id
    }
  }
}