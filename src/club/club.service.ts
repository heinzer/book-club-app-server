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

  async findOne(id: string): Promise<Club | undefined> {
    return await this.clubRepository.findOne({ id: id });
  }

  async addClub(club): Promise<Club> {
    await this.clubRepository.insert(club);
    return club;
  }
}
