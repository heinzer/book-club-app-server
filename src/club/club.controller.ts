import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MembershipService } from '../membership/membership.service';
import { ThemeEntity } from '../theme/theme.entity';
import { ThemeService } from '../theme/theme.service';
import { UserMembership } from '../user/user.entity';
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
  getClub(@Param('id') id: number): Promise<ClubEntity | undefined> {
    return this.clubService.findClub(id);
  }

  @Post()
  async createClub(@Body() club: ClubCreationRequest): Promise<ClubEntity> {
    return await this.clubService.createClub(club);
  }

  @Put(':id')
  async updateClub(
    @Param('id') id: number,
    @Body() club: ClubUpdateRequest,
  ): Promise<ClubEntity> {
    // todo: this can eventually be updated to bulk invite members
    return await this.clubService.updateClub(id, club);
  }

  @Delete(`:id`)
  async deleteClub(@Param('id') id: number): Promise<void> {
    return await this.clubService.deleteClub(id);
  }

  @Get(':id/memberships')
  async getClubMemberships(@Param('id') id: number): Promise<UserMembership[]> {
    return await this.membershipService.findMembershipsByClub(id);
  }

  @Get(':id/current-theme')
  async getCurrentTheme(@Param('id') id: number): Promise<ThemeEntity> {
    return await this.themeService.getCurrentTheme(id);
  }

  @Get(':id/themes')
  async getThemes(@Param('id') id: number): Promise<ThemeEntity[]> {
    return await this.themeService.getThemes(id);
  }
}

export interface ClubCreationRequest {
  adminId: number;
  name: string;
}

export interface ClubUpdateRequest {
  id: number;
  name: string;
}
