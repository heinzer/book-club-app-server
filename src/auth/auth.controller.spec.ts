import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [],
    }).compile();
  });
});
