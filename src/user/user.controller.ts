import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IUser, IUserCreateRequest, UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<IUser[]> {
    return await this.userService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<IUser> {
    return await this.userService.findOne(id);
  }
}
