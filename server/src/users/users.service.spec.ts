import { Test, TestingModule } from '@nestjs/testing';
import { Model, Query } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { createMock } from '@golevelup/ts-jest';

import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { mockUser, mockUserDoc, userArray, userDocArray } from '../../test/mock';

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          // notice that only the functions we call from the model are mocked
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser()),
            constructor: jest.fn().mockResolvedValue(mockUser()),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return user by email', async () => {
    jest.spyOn(model, 'findOne').mockReturnValueOnce(
      createMock<Query<User>>({
        exec: jest.fn().mockResolvedValueOnce(mockUserDoc({ email: 'test@gmail.com' })),
      }) as any,
    );
    const findMockUser = mockUserDoc();
    const foundUser = await service.findOneByEmail('test@gmail.com');
    expect(foundUser).toEqual(findMockUser);
  });

  it('should return list users by user ids', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(userDocArray),
    } as any);
    const users = await service.findByListIds(['a uuid', 'a new uuid']);
    expect(users).toEqual(userDocArray);
  });

  it('should register a new user', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        _id: 'a uuid',
        name: 'test',
        email: 'test-create@gmail.com',
        password: '123456789',
      } as User),
    );
    const newUser = await service.register('test', 'test-create@gmail.com', '123456789');
    const userMock = mockUserDoc({
      name: 'test',
      email: 'test-create@gmail.com',
      password: '123456789',
    });
    expect(newUser).toEqual(userMock);
  });
});
