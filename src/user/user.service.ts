import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async getUsers(): Promise<IUser[]> {
    const users = await this.usersRepository.find();
    return users.map((user) => this.toUserResult(user));
  }

  async addUser(userRequest: IUserCreateRequest): Promise<IUser> {
    const { username, password, email } = userRequest;

    // check if the user exists in the db
    const userInDb = await this.usersRepository.findOne({
      where: { username },
    });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const newUser: UserEntity = await this.usersRepository.create({
      username,
      password,
      email,
    });
    await this.usersRepository.save(newUser);
    return this.toUserResult(newUser); // remove the password before returning to the user
  }

  async findOne(username: string): Promise<IUser | undefined> {
    const user = await this.usersRepository.findOne({ username: username });
    return user ? this.toUserResult(user) : undefined;
  }

  async findByPayload(username: string, pass: string): Promise<IUser | undefined> {
    const user = await this.usersRepository.findOne({ username: username });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return undefined;
  }

  toUserResult(user: UserEntity): IUser {
    return {
      username: user.username,
      email: user.email,
    };
  }
}

export interface IUser {
  username: string;
  email: string;
}

export interface IUserCreateRequest extends IUser {
  username: string;
  password: string;
  email: string;
}
