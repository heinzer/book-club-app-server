import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | undefined> {
    return await this.userService.findByPayload(email, pass);
  }

  login(user: any): string {
    const payload = { email: user.email, sub: user.userId };
    return this.jwtService.sign(payload);
  }
}
