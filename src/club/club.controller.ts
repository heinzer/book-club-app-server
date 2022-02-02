import { Body, Controller, Get, Post } from '@nestjs/common';
import { Club } from './club.entity';
import { ClubService } from './club.service';

@Controller('club')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Get()
  getClubs() {
    return this.clubService.getClubs();
  }

  @Post()
  addClub(@Body() club: Club) {
    return this.clubService.addClub(club);
  }
}
