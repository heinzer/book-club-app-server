import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Public } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { IUser, IUserCreateRequest, UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Post('register')
  async registerUser(@Body() createUserRequest: IUserCreateRequest) {
    const user = await this.userService.addUser(createUserRequest);
    const token = await this.authService.login(user);
    return {
      ...user,
      ...token,
    };
  }
}
