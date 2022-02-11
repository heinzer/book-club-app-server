import { Controller, Get, Param, Post } from '@nestjs/common';
import { ClubEntity } from '../club/club.entity';
import { MembershipService } from '../memberships/membership.service';
import { IUser } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly membershipService: MembershipService,
  ) {}

  @Get()
  async getUsers(): Promise<IUser[]> {
    return await this.userService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<IUser> {
    return await this.userService.findOne(id);
  }

  @Get(':id/memberships')
  async getUserMemberships(@Param('id') id: string): Promise<ClubEntity[]> {
    return await this.membershipService.findMembershipsByUser(id);
  }
}
