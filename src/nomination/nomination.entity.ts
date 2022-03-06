import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'nomination' })
export class NominationEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty()
  @Column({
    type: 'numeric',
    nullable: false,
  })
  themeId: string;

  @ApiProperty()
  @Column({
    type: 'numeric',
    nullable: false,
  })
  bookId: string;

  @ApiProperty()
  @Column({
    type: 'numeric',
    nullable: false,
  })
  nominatorId: string;
}
