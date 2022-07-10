import { User } from '../../src/users/interfaces/user.interface';

const mockUser = (name = 'Test', email = 'test@gmail.com', password = '123456789'): any => ({
  name,
  email,
  password,
});

const mockUserDoc = (mock?: Partial<User>): Partial<User> => ({
  name: mock?.name || 'Test',
  _id: mock?._id || 'a uuid',
  email: mock?.email || 'test@gmail.com',
  password: mock?.password || '123456789',
});

const userArray = [mockUser(), mockUser('Vitani', 'abc@gmail.com', '123456789')];

const userDocArray = [
  mockUserDoc(),
  mockUserDoc({
    name: 'Vitani',
    _id: 'a new uuid',
    email: 'test@gmail.com',
    password: '123456789',
  }),
];

export { mockUser, mockUserDoc, userArray, userDocArray };
