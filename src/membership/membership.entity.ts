import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'membership' })
export class MembershipEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  userId: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  clubId: number;

  @ApiProperty()
  @Column({
    type: 'boolean',
    default: false,
    nullable: false,
  })
  isAdmin: boolean;
}
