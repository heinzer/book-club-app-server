import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from './club.entity';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(Club)
    private usersRepository: Repository<Club>,
  ) {}

  getClubs(): Promise<Club[]> {
    return this.usersRepository.find();
  }

  addClub(club): Promise<Club> {
    this.usersRepository.insert(club);
    return club;
  }
}
