import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipEntity } from '../memberships/membership.entity';
import { MembershipModule } from '../memberships/membership.module';
import { ClubController } from './club.controller';
import { ClubEntity } from './club.entity';
import { ClubService } from './club.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClubEntity, MembershipEntity]),
    MembershipModule,
  ],
  controllers: [ClubController],
  providers: [ClubService],
})
export class ClubModule {}
