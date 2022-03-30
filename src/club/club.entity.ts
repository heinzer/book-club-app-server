import { ApiProperty } from '@nestjs/swagger';
import {Entity, Column, PrimaryGeneratedColumn, Repository} from 'typeorm';
import {HttpException, HttpStatus} from '@nestjs/common';

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

export async function findClub(clubRepository: Repository<ClubEntity>, id: number): Promise<ClubEntity | undefined> {
  const clubEntity = await clubRepository.findOne({ id: id });
  if (!clubEntity || clubEntity?.isSoftDeleted === true) {
    throw new HttpException('Club not found', HttpStatus.NOT_FOUND);
  }
  return clubEntity;
}
