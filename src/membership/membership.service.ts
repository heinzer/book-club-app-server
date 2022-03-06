import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClubEntity } from '../club/club.entity';
import { toUserResult, User, UserEntity } from '../user/user.entity';
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

  async findMembershipsByUser(userId: string): Promise<ClubEntity[]> {
    const memberships: MembershipEntity[] =
      await this.membershipRepository.find({ userId: userId });

    const clubs: ClubEntity[] = [];
    for (const membership of memberships) {
      const club = await this.clubRepository.findOne({ id: membership.clubId });
      if (club) {
        clubs.push(club);
      }
    }
    return clubs;
  }

  async findMembershipsByClub(clubId: string): Promise<User[]> {
    const memberships: MembershipEntity[] =
      await this.membershipRepository.find({ clubId: clubId });

    const users: User[] = [];
    for (const membership of memberships) {
      const user = await this.userRepository.findOne({ id: membership.userId });
      if (user) {
        users.push(toUserResult(user));
      }
    }
    return users;
  }

  async createMembership(userId: string, clubId: string): Promise<MembershipEntity> {
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
