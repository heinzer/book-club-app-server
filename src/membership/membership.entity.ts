import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'membership' })
export class MembershipEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  userId: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  clubId: string;

  @ApiProperty()
  @Column({
    type: 'boolean',
    default: false,
    nullable: false,
  })
  isAdmin: boolean;
}
