import { Controller, Get, Post, Body, Param, Put, Patch, Delete } from '@nestjs/common'

@Controller('users')
export class UserController {

  @Post()
  async create (@Body() body) {
    return { body }
  }

  @Get()
  async read () {
    return { users: [] }
  }

  @Get(':id')
  async readOne (@Param() params) {
    return { user: {}, params }
  }

  @Put(':id')
  async updateAllInfo (@Param() params, @Body() body) {
    return { 
      method: 'The method used here was PUT',
      body,
      params
     }
  }

  @Patch(':id')
  async updateSomeInfo (@Param() params, @Body() body) {
    return {
      method: 'The method used here was PATCH',
      body,
      params
    }
  }

  @Delete(':id')
  async delete (@Param() params) {
    return {
      params
    }
  }
}