import { Test, TestingModule } from '@nestjs/testing';

import { LinksResolvers } from './links.resolvers';
import { LinksService } from './links.service';
import { AddLinkDto } from './dto/add-link.dto';
import { mockLink, mockUser } from '../../test/mock';
import { User } from '../users/interfaces/user.interface';

describe('LinksResolvers', () => {
  let resolver: LinksResolvers;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LinksResolvers,
        {
          provide: LinksService,
          useFactory: () => ({
            findAll: jest.fn(() => [mockLink()]),
            create: jest.fn((link: AddLinkDto) => mockLink()),
          }),
        },
      ],
    }).compile();

    resolver = module.get<LinksResolvers>(LinksResolvers);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should get the links array', async () => {
    const user = { id: 'a user uuid', name: 'User testing', email: 'user@gmail.com' } as User;
    const link = mockLink();
    const links = await resolver.getLinks(null, 1, 10);
    expect(links).toEqual([link]);
  });

  it('should create a new link successfully', async () => {
    const user = { id: 'a user uuid', name: 'User testing', email: 'user@gmail.com' } as User;
    const link = mockLink();
    const linkResult = await resolver.create(user, link);
    expect(linkResult).toEqual(link);
  });
});
