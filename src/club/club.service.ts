import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MembershipEntity } from '../membership/membership.entity';
import { ClubCreationRequest, ClubUpdateRequest } from './club.controller';
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
    return this.clubRepository.find({ isSoftDeleted: false });
  }

  async findClub(id: string): Promise<ClubEntity | undefined> {
    const clubEntity = await this.clubRepository.findOne({ id: id });
    if (!clubEntity || clubEntity?.isSoftDeleted === true) {
      throw new HttpException('Club not found', HttpStatus.NOT_FOUND);
    }
    return clubEntity;
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

  async updateClub(
    id: string,
    clubRequest: ClubUpdateRequest,
  ): Promise<ClubEntity> {
    const clubEntity = await this.findClub(id);
    return await this.clubRepository.save({
      ...clubEntity,
      ...clubRequest,
    });
  }

  async deleteClub(id: string): Promise<void> {
    const clubEntity = await this.findClub(id);
    await this.clubRepository.save({
      ...clubEntity,
      isSoftDeleted: true,
    });
  }
}
