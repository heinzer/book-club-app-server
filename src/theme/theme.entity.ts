import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { Omit } from '../user/user.entity';

@Entity({ name: 'theme' })
export class ThemeEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: false,
  })
  clubId: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: true,
  })
  description: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: false,
  })
  nominatorId: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: false,
  })
  status: ThemeStatus;

  @ApiProperty()
  @Column({
    type: 'timestamp',
    nullable: false,
  })
  startDate: Date;

  @ApiProperty()
  @Column({
    type: 'timestamp',
    nullable: false,
  })
  nominationDeadline: Date;

  @ApiProperty()
  @Column({
    type: 'timestamp',
    nullable: false,
  })
  votingDeadline: Date;

  @ApiProperty()
  @Column({
    type: 'timestamp',
    nullable: false,
  })
  readingDeadline: Date;

  @ApiProperty()
  @Column({
    type: 'timestamp',
    nullable: false,
  })
  discussionDeadline: Date;

  @ApiProperty()
  @Column({
    type: 'boolean',
    default: false,
    nullable: false,
  })
  isSoftDeleted: boolean;
}

export async function getTheme(
  themeRepository: Repository<ThemeEntity>,
  id: string,
): Promise<ThemeEntity> {
  const theme = await themeRepository.findOne({ id: id });
  if (!theme || theme?.isSoftDeleted === true) {
    throw new HttpException('Theme not found', HttpStatus.NOT_FOUND);
  }
  return theme;
}

export class ThemeRequest extends Omit(ThemeEntity, ['id']) {}

export enum ThemeStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}
