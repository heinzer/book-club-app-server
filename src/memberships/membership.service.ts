import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { toUserResult, UserEntity } from '../user/user.entity';
import { MembershipEntity } from './membership.entity';

@Injectable()
export class MembershipService {
  constructor(
    @InjectRepository(MembershipEntity) private membershipRepository: Repository<MembershipEntity>,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
  ) {}

  async findMembershipsByUser(userId: string): Promise<MembershipEntity[]> {
    return await this.membershipRepository.find({ userId: userId });
  }

  async findMembershipsByClub(clubId: string): Promise<any> {
    const memberships: MembershipEntity[] = await this.membershipRepository.find({ clubId: clubId });

    const users = [];
    for (const membership of memberships) {
      const user = await this.userRepository.findOne({ id: membership.userId });
      if (user) {
        users.push(toUserResult(user));
      }
    }
    return users;
  }
}
