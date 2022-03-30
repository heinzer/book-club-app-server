import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  CreateDateColumn, Repository,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import {HttpException, HttpStatus} from '@nestjs/common';
import {ClubEntity} from '../club/club.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  email: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: false,
  })
  firstName: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: true,
  })
  lastName: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: true,
  })
  city: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: true,
  })
  state: string;

  @ApiProperty()
  @CreateDateColumn()
  createdDate: Date;

  @BeforeInsert() // runs this before saving to db
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}

export async function findUser(userRepository: Repository<UserEntity>, id: number): Promise<User | undefined> {
  const userEntity = await userRepository.findOne({ id: id });
  if (!userEntity) {
    throw new HttpException('Club not found', HttpStatus.NOT_FOUND);
  }
  return userEntity ? toUserResult(userEntity) : undefined;
}

export function toUserResult(userEntity: UserEntity): User {
  const { password, ...result } = userEntity;
  return result as User;
}

export const Omit = <T, K extends keyof T>(
  Class: new () => T,
  keys: K[],
): new () => Omit<T, typeof keys[number]> => Class;

export class User extends Omit(UserEntity, ['password']) {}

export class UserMembership extends User {
  isAdmin: boolean;
}

export class UserCreateRequest extends Omit(UserEntity, ['id']) {}

export class AccessToken {
  access_token: string;
}
