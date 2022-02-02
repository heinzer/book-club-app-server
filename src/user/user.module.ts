import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubController } from '../club/club.controller';
import { ClubService } from '../club/club.service';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [ClubController],
  providers: [ClubService],
})
export class UserModule {}
