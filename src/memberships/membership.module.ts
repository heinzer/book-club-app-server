import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { MembershipEntity } from './membership.entity';
import { MembershipService } from './membership.service';

@Module({
  imports: [TypeOrmModule.forFeature([MembershipEntity, UserEntity])],
  exports: [MembershipService],
  providers: [MembershipService],
})
export class MembershipModule {}
