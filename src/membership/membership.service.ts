import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {ClubEntity, findClub} from '../club/club.entity';
import {findUser, toUserResult, UserEntity, UserMembership} from '../user/user.entity';
import { MembershipEntity } from './membership.entity';

@Injectable()
export class MembershipService {
  constructor(
    @InjectRepository(MembershipEntity)
    private membershipRepository: Repository<MembershipEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ClubEntity)
    private clubRepository: Repository<ClubEntity>,
  ) {}

  async findMembershipsByUser(userId: number): Promise<ClubMembership[]> {
    // verify that this user id exists
    await findUser(this.userRepository, userId);

    const memberships: MembershipEntity[] =
      await this.membershipRepository.find({ userId: userId });

    const clubs: ClubMembership[] = [];
    for (const membership of memberships) {
      const club = await this.clubRepository.findOne({ id: +membership.clubId, isSoftDeleted: false });
      if (club) {
        clubs.push({
          ...club,
          isAdmin: membership.isAdmin,
        });
      }
    }
    return clubs;
  }

  async findMembershipsByClub(clubId: number): Promise<UserMembership[]> {
    // verify that this club id exists and is not soft deleted
    await findClub(this.clubRepository, clubId);

    const memberships: MembershipEntity[] =
      await this.membershipRepository.find({ clubId: clubId });

    const users: UserMembership[] = [];
    for (const membership of memberships) {
      const user = await this.userRepository.findOne({ id: membership.userId });
      if (user) {
        users.push({
          ...toUserResult(user),
          isAdmin: membership.isAdmin,
        });
      }
    }
    return users;
  }

  async createMembership(
    userId: number,
    clubId: number,
  ): Promise<MembershipEntity> {
    const membershipInDb = await this.membershipRepository.findOne({
      where: { userId: userId },
    });
    if (membershipInDb) {
      throw new HttpException(
        'Membership already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newMembership: MembershipEntity =
      await this.membershipRepository.create({
        userId,
        clubId,
      });
    return await this.membershipRepository.save(newMembership);
  }
}

export interface ClubMembership extends ClubEntity {
  isAdmin: boolean;
}
