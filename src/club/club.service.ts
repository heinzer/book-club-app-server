import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MembershipEntity } from '../membership/membership.entity';
import { ClubCreationRequest } from './club.controller';
import { ClubEntity } from './club.entity';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(ClubEntity)
    private clubRepository: Repository<ClubEntity>,
    @InjectRepository(MembershipEntity)
    private membershipRepository: Repository<MembershipEntity>,
  ) {}

  getClubs(): Promise<ClubEntity[]> {
    return this.clubRepository.find();
  }

  async findOne(id: string): Promise<ClubEntity | undefined> {
    return await this.clubRepository.findOne({ id: id });
  }

  async createClub(club: ClubCreationRequest): Promise<ClubEntity> {
    const newClub: ClubEntity = this.clubRepository.create({ ...club });
    await this.clubRepository.save(newClub);

    // the person who creates the club is automatically added to the club
    await this.membershipRepository.insert({
      clubId: newClub.id,
      userId: club.adminId,
    });

    return newClub;
  }
}
