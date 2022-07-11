import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { mockUser, mockUserDoc } from '../../test/mock/user';
import { User } from '../users/interfaces/user.interface';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser()),
            constructor: jest.fn().mockResolvedValue(mockUser()),
            findOneByEmail: jest.fn(),
            register: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should validate user successfully', async () => {
    const password = '$2b$10$Vhdogiely7wcfMXVHon9i.5P7Vrzgp3I0v4CMeyROwd.k18awwjsW';
    jest.spyOn(userService, 'findOneByEmail').mockReturnValue(
      Promise.resolve({
        _id: 'a uuid',
        name: 'Test',
        email: 'test@gmail.com',
        password,
      } as User),
    );

    const findMockUser = mockUserDoc({
      password,
    });
    const foundUser = await authService.validateUser('test@gmail.com', '123456789');
    expect(foundUser).toEqual(findMockUser);
  });

  it('should login successfully', async () => {
    const accessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVXNlciAxIiwiZW1haWwiOiJuZXN0anMxQGRlbW8uY29tIiwiX192IjowLCJpZCI6IjYwNjEzOTEyMjY2YjJhM2E4ZDJjODcwOSIsImlhdCI6MTY1NzMzNjk0NiwiZXhwIjoxNjU3NDIzMzQ2fQ.mTI4hW62lvG4bUc3Gvz8OYibN3XYXha6Ilnrv2QCYcw';
    jest.spyOn(jwtService, 'sign').mockReturnValue(accessToken);
    const user = mockUserDoc();
    user.toJSON = () => user;
    const loginResult = await authService.login(user);
    expect(loginResult?.accessToken).toEqual(accessToken);
  });

  it('should verify JWT', async () => {
    const accessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVXNlciAxIiwiZW1haWwiOiJuZXN0anMxQGRlbW8uY29tIiwiX192IjowLCJpZCI6IjYwNjEzOTEyMjY2YjJhM2E4ZDJjODcwOSIsImlhdCI6MTY1NzMzNjk0NiwiZXhwIjoxNjU3NDIzMzQ2fQ.mTI4hW62lvG4bUc3Gvz8OYibN3XYXha6Ilnrv2QCYcw';
    jest.spyOn(jwtService, 'verify').mockReturnValue({});
    const verifyTokenResult = await authService.verifyJwt(accessToken);
    expect(verifyTokenResult).toEqual({});
  });

  it('should register successfully', async () => {
    const user = mockUserDoc();
    jest.spyOn(userService, 'register').mockReturnValue(
      Promise.resolve({
        _id: 'a uuid',
        name: 'Test',
        email: 'test@gmail.com',
        password: '123456789',
      } as User),
    );
    const registerResult = await authService.register({
      name: 'Test',
      email: 'test@gmail.com',
      password: '123456789',
    });
    expect(registerResult).toEqual(user);
  });
});
