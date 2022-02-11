import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClubEntity } from './club.entity';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(ClubEntity)
    private clubRepository: Repository<ClubEntity>,
  ) {}

  getClubs(): Promise<ClubEntity[]> {
    return this.clubRepository.find();
  }

  async findOne(id: string): Promise<ClubEntity | undefined> {
    return await this.clubRepository.findOne({ id: id });
  }

  async addClub(club): Promise<ClubEntity> {
    await this.clubRepository.insert(club);
    return club;
  }
}
