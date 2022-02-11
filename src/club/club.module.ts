import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipModule } from '../memberships/membership.module';
import { ClubController } from './club.controller';
import { ClubEntity } from './club.entity';
import { ClubService } from './club.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClubEntity]), MembershipModule],
  controllers: [ClubController],
  providers: [ClubService],
})
export class ClubModule {}
