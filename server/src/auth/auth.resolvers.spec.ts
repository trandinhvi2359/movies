import { Test, TestingModule } from '@nestjs/testing';
import { REQUEST } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';

import { AuthResolvers } from './auth.resolvers';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { mockUserDoc } from '../../test/mock/user';

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVXNlciAxIiwiZW1haWwiOiJuZXN0anMxQGRlbW8uY29tIiwiX192IjowLCJpZCI6IjYwNjEzOTEyMjY2YjJhM2E4ZDJjODcwOSIsImlhdCI6MTY1NzMzNjk0NiwiZXhwIjoxNjU3NDIzMzQ2fQ.mTI4hW62lvG4bUc3Gvz8OYibN3XYXha6Ilnrv2QCYcw';

describe('AuthResolvers', () => {
  let resolver: AuthResolvers;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolvers,
        {
          provide: AuthService,
          useFactory: () => ({
            login: jest.fn(() => ({ accessToken })),
            validateUser: jest.fn((username: string, password: string) => mockUserDoc()),
            register: jest.fn((user: RegisterDto) => mockUserDoc()),
          }),
        },
      ],
    }).compile();

    resolver = module.get<AuthResolvers>(AuthResolvers);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should login successfully', async () => {
    const user = mockUserDoc();
    const loginResult = await resolver.login((user as any).username, (user as any).password);
    expect(loginResult.accessToken).toEqual(accessToken);
  });

  it('should register successfully', async () => {
    const user = mockUserDoc();
    const registerResult = await resolver.register({
      name: 'test',
      username: 'test@gmail.com',
      password: '123456789',
    });
    expect(registerResult).toEqual(user);
  });
});
