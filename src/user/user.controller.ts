import { Controller, Get, Param, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClubMembership, MembershipService} from '../membership/membership.service';
import { User } from './user.entity';
import { UserService } from './user.service';

@ApiTags('users')
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly membershipService: MembershipService,
  ) {}

  @Get('users')
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @Get('users/:id')
  async getUser(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Get('users/:id/memberships')
  async getUserMemberships(@Param('id') id: string): Promise<ClubMembership[]> {
    return await this.membershipService.findMembershipsByUser(id);
  }

  @Get('profile')
  async getUserByEmail(@Request() req) {
    return await this.userService.findByEmail(req.user.email);
  }
}
