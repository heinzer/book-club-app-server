import { Controller, Request, Post, UseGuards, Body, Get} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { UserCreateRequest, AccessToken} from '../user/user.entity';
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
  async login(@Request() req): Promise<AccessToken> {
    return { access_token: this.authService.login(req.user)};
  }

  @Public()
  @Post('register')
  async registerUser(@Body() createUserRequest: UserCreateRequest): Promise<AccessToken> {
    const user = await this.userService.createUser(createUserRequest);
    return { access_token: await this.authService.login(user)};
  }

  @Get('isAuthed')
  isAuthenticated() {
    return true;
  }
}
