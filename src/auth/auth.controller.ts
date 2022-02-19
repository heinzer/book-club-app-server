import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { UserCreateRequest, User, AuthedUser } from '../user/user.entity';
import { UserService } from '../user/user.service';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(@Request() req): Promise<AuthedUser> {
    const authedUser = new AuthedUser();
    authedUser.access_token = this.authService.login(req.user);
    const user: User = await this.userService.findByEmail(req.user.email);
    Object.assign(authedUser, user);
    return authedUser;
  }

  @Public()
  @Post('register')
  async registerUser(@Body() createUserRequest: UserCreateRequest) {
    const authedUser = new AuthedUser();
    const user = await this.userService.createUser(createUserRequest);
    Object.assign(authedUser, user);
    authedUser.access_token = await this.authService.login(user);
    return authedUser;
  }
}
