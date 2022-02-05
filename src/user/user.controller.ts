import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IUser, IUserCreateRequest, UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<IUser[]> {
    return await this.userService.getUsers();
  }

  @Get(':username')
  async getUser(@Param('username') username: string): Promise<IUser> {
    return await this.userService.findOne(username);
  }

  @Post()
  async addUser(@Body() createUserRequest: IUserCreateRequest): Promise<IUser> {
    console.log('Calling addUser()');
    return await this.userService.addUser(createUserRequest);
  }
}
