import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipEntity } from '../memberships/membership.entity';
import { ThemeController } from './theme.controller';
import { ThemeEntity } from './theme.entity';
import { ThemeService } from './theme.service';

@Module({
  imports: [TypeOrmModule.forFeature([ThemeEntity, MembershipEntity])],
  exports: [ThemeService],
  controllers: [ThemeController],
  providers: [ThemeService],
})
export class ThemeModule {}
