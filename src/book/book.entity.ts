import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { NominationEntity } from '../nomination/nomination.entity';

@Entity({ name: 'book' })
export class BookEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: false,
  })
  isbn: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: false,
  })
  workId: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: true,
  })
  triggerWarnings: string;
}

export interface Book {
  externalBookData: any;
  nomination: NominationEntity;
  book: BookEntity;
}

export interface NominateBookRequest {
  themeId: string;
  nominatorId: string;
  isbn: string;
  workId: string;
  triggerWarnings: string;
}

export interface ExternalBookEntity {
  description: string;
  title: string;
  covers: number[];
  subjects: string[];
  subject_people: string[];
  key: string;
  authors: ExternalAuthor[];
  type: { key: string };
}

export interface ExternalAuthor {
  author: {
    key: string;
  };
  type: {
    key: string;
  };
}
