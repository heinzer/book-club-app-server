import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MembershipService } from '../membership/membership.service';
import { ThemeEntity } from '../theme/theme.entity';
import { ThemeService } from '../theme/theme.service';
import { User } from '../user/user.entity';
import { ClubEntity } from './club.entity';
import { ClubService } from './club.service';

@ApiTags('clubs')
@Controller('clubs')
export class ClubController {
  constructor(
    private readonly clubService: ClubService,
    private readonly membershipService: MembershipService,
    private themeService: ThemeService,
  ) {}

  @Get()
  getClubs() {
    return this.clubService.getClubs();
  }

  @Get(':id')
  getClub(@Param('id') id: string): Promise<ClubEntity | undefined> {
    return this.clubService.findOne(id);
  }

  @Post()
  async createClub(@Body() club: ClubCreationRequest): Promise<ClubEntity> {
    return await this.clubService.createClub(club);
  }

  @Get(':id/memberships')
  async getClubMemberships(@Param('id') id: string): Promise<User[]> {
    return await this.membershipService.findMembershipsByClub(id);
  }

  @Get(':id/current-theme')
  async getCurrentTheme(@Param('id') id: string): Promise<ThemeEntity> {
    return await this.themeService.getCurrentTheme(id);
  }

  @Get(':id/themes')
  async getThemes(@Param('id') id: string): Promise<ThemeEntity[]> {
    return await this.themeService.getThemes(id);
  }
}

export interface ClubCreationRequest {
  adminId: string;
  name: string;
}
