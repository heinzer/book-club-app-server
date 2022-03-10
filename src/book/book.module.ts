import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NominationEntity } from '../nomination/nomination.entity';
import { ThemeEntity } from '../theme/theme.entity';
import { BookEntity } from './book.entity';
import { BookService } from './book.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookEntity, NominationEntity, ThemeEntity]),
    HttpModule,
  ],
  exports: [BookService],
  providers: [BookService],
})
export class BookModule {}
