import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  addUser(user): Promise<User> {
    this.usersRepository.insert(user);
    return user;
  }

  async findOne(username: string): Promise<User | undefined> {
    // return this.usersRepository.find(user => user.username === username);
    return this.usersRepository.findOne({ username: username } );
  }
}
