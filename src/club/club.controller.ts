import { Body, Controller, Get, Post } from '@nestjs/common';
import { Club } from './club.entity';
import { ClubService } from './club.service';

@Controller('club')
export class ClubController {
  constructor(private readonly userService: ClubService) {}

  @Get()
  getUsers() {
    return this.userService.getClubs();
  }

  @Post()
  addUser(@Body() club: Club) {
    return this.userService.addClub(club);
  }
}
