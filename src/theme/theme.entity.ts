import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
}

export class ThemeRequest extends Omit(ThemeEntity, ['id']) {}

export enum ThemeStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}
