import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipEntity } from '../membership/membership.entity';
import { MembershipModule } from '../membership/membership.module';
import { ThemeModule } from '../theme/theme.module';
import { ClubController } from './club.controller';
import { ClubEntity } from './club.entity';
import { ClubService } from './club.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClubEntity, MembershipEntity]),
    MembershipModule,
    ThemeModule,
  ],
  controllers: [ClubController],
  providers: [ClubService],
})
export class ClubModule {}
