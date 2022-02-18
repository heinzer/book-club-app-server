import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import {
  IUser,
  IUserCreateRequest,
  toUserResult,
  UserEntity,
} from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async getUsers(): Promise<IUser[]> {
    const users = await this.usersRepository.find();
    return users.map((user) => toUserResult(user));
  }

  async addUser(userRequest: IUserCreateRequest): Promise<IUser> {
    // check if the user exists in the db
    const { email } = userRequest;
    const userInDb = await this.usersRepository.findOne({
      where: { email },
    });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const newUser: UserEntity = await this.usersRepository.create({
      ...userRequest,
    });
    await this.usersRepository.save(newUser);
    return toUserResult(newUser); // remove the password before returning to the user
  }

  async findOne(id: string): Promise<IUser | undefined> {
    const user = await this.usersRepository.findOne({ id: id });
    return user ? toUserResult(user) : undefined;
  }

  async findByEmail(email: string): Promise<IUser | undefined> {
    const user = await this.usersRepository.findOne({ email: email });
    return user ? toUserResult(user) : undefined;
  }

  async findByPayload(email: string, pass: string): Promise<IUser | undefined> {
    console.log('finding by payload');
    const user = await this.usersRepository.findOne({ email: email });
    if (user && (await bcrypt.compare(pass, user.password))) {
      return toUserResult(user);
    }
    return undefined;
  }
}
