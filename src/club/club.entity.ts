import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'club' })
export class ClubEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @ApiProperty()
  @Column({
    type: 'boolean',
    default: false,
    nullable: false,
  })
  isSoftDeleted: boolean;
}
