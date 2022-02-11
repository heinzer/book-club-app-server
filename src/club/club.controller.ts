import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MembershipEntity } from '../memberships/membership.entity';
import { MembershipService } from '../memberships/membership.service';
import { IUser } from '../user/user.entity';
import { ClubEntity } from './club.entity';
import { ClubService } from './club.service';

@Controller('clubs')
export class ClubController {
  constructor(
    private readonly clubService: ClubService,
    private readonly membershipService: MembershipService,
  ) {}

  @Get()
  getClubs() {
    return this.clubService.getClubs();
  }

  @Get('id')
  getClub(@Param('id') id: string): Promise<ClubEntity | undefined> {
    return this.clubService.findOne(id);
  }

  @Post()
  addClub(@Body() club: ClubCreationRequest) {
    return this.clubService.addClub(club);
  }

  @Get(':id/memberships')
  async getClubMemberships(@Param('id') id: string): Promise<IUser[]> {
    return await this.membershipService.findMembershipsByClub(id);
  }
}

export interface ClubCreationRequest {
  adminId: string;
  name: string;
}
