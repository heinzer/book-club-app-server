import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MembershipService } from '../memberships/membership.service';
import { User } from '../user/user.entity';
import { ClubEntity } from './club.entity';
import { ClubService } from './club.service';

@ApiTags('clubs')
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
  async addClub(@Body() club: ClubCreationRequest): Promise<ClubEntity> {
    return await this.clubService.addClub(club);
  }

  @Get(':id/memberships')
  async getClubMemberships(@Param('id') id: string): Promise<User[]> {
    return await this.membershipService.findMembershipsByClub(id);
  }
}

export interface ClubCreationRequest {
  adminId: string;
  name: string;
}
