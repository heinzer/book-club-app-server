import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from './club.entity';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(Club)
    private clubRepository: Repository<Club>,
  ) {}

  getClubs(): Promise<Club[]> {
    return this.clubRepository.find();
  }

  addClub(club): Promise<Club> {
    this.clubRepository.insert(club);
    return club;
  }
}
