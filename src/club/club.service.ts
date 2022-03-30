import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MembershipEntity } from '../membership/membership.entity';
import { ClubCreationRequest, ClubUpdateRequest } from './club.controller';
import { ClubEntity, findClub } from './club.entity';

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

  async findClub(id: number): Promise<ClubEntity | undefined> {
    return await findClub(this.clubRepository, id);
  }

  async createClub(club: ClubCreationRequest): Promise<ClubEntity> {
    const newClub: ClubEntity = this.clubRepository.create({ ...club });
    await this.clubRepository.save(newClub);

    // the person who creates the club is automatically added to the club
    await this.membershipRepository.insert({
      clubId: newClub.id,
      userId: club.adminId,
      isAdmin: true,
    });

    return newClub;
  }

  async updateClub(
    id: number,
    clubRequest: ClubUpdateRequest,
  ): Promise<ClubEntity> {
    const clubEntity: ClubEntity = await this.findClub(id);
    return await this.clubRepository.save({
      ...clubEntity,
      ...clubRequest,
    });
  }

  async deleteClub(id: number): Promise<void> {
    const clubEntity = await this.findClub(id);
    await this.clubRepository.save({
      ...clubEntity,
      isSoftDeleted: true,
    });
  }
}
