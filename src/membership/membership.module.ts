import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubEntity } from '../club/club.entity';
import { UserEntity } from '../user/user.entity';
import { MembershipEntity } from './membership.entity';
import { MembershipService } from './membership.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MembershipEntity, UserEntity, ClubEntity]),
  ],
  exports: [MembershipService],
  providers: [MembershipService],
})
export class MembershipModule {}
