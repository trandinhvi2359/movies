import { Test, TestingModule } from '@nestjs/testing';
import { Model, Query } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { createMock } from '@golevelup/ts-jest';
import { I18nRequestScopeService } from 'nestjs-i18n';

import { LinksService } from './links.service';
import { UsersService } from '../users/users.service';
import { Link } from './interfaces/link.interface';
import { mockLink, mockLinkDoc, linkArray, linkDocArray, mockUserDoc } from '../../test/mock';

let linkDocArrayData = linkDocArray;
linkDocArrayData = linkDocArrayData.map((link) => {
  link.toCreatedBy = (createdBy) => {
    return link;
  };
  return link;
});

describe('LinksService', () => {
  let linkService: LinksService;
  let userService: UsersService;
  let i18Service: I18nRequestScopeService;
  let model: Model<Link>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LinksService,
        {
          provide: getModelToken('Link'),
          // notice that only the functions we call from the model are mocked
          useValue: {
            findAll: jest.fn().mockResolvedValue({ hasMore: false, links: linkDocArrayData }),
            constructor: jest.fn().mockResolvedValue(mockLink()),
            find: jest.fn(),
            findOne: jest.fn(),
            count: jest.fn().mockResolvedValue(1),
            create: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            new: jest.fn().mockResolvedValue(mockLink()),
            constructor: jest.fn().mockResolvedValue(mockLink()),
            findOneByEmail: jest.fn(),
            register: jest.fn(),
            findByListIds: jest
              .fn()
              .mockResolvedValue([
                mockUserDoc({ _id: '5b3980c956d5a405cc4007c5' }),
                mockUserDoc({ _id: '5b3980c956d5a405cc4007c6' }),
              ]),
          },
        },
        {
          provide: I18nRequestScopeService,
          useValue: {
            translate: jest.fn(),
          },
        },
      ],
    }).compile();

    linkService = module.get<LinksService>(LinksService);
    userService = module.get<UsersService>(UsersService);
    i18Service = module.get<I18nRequestScopeService>(I18nRequestScopeService);
    model = module.get<Model<Link>>(getModelToken('Link'));
  });

  it('should be defined', () => {
    expect(linkService).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get video id from youtube link', async () => {
    const linkObject = mockLink();
    const videoId = 'eZxvfVZh3cQ';
    const getVideoIdResult = await linkService.getVideoIdFromYoutubeLink(linkObject.link);
    expect(getVideoIdResult).toEqual(videoId);
  });

  it('should get video id from youtube link', async () => {
    const linkObject = mockLink();
    const videoId = 'eZxvfVZh3cQ';
    const getVideoIdResult = await linkService.getVideoIdFromYoutubeLink(linkObject.link);
    expect(getVideoIdResult).toEqual(videoId);
  });

  it('should return list links', async () => {
    jest.spyOn(model, 'find').mockReturnValueOnce(
      createMock<Query<Link>>({
        skip: () => ({
          limit: () => ({
            sort: () => ({
              exec: jest.fn().mockResolvedValueOnce(linkDocArrayData),
            }),
          }),
        }),
      }) as any,
    );
    jest.spyOn(model, 'count').mockReturnValueOnce(
      createMock<Query<Link>>({
        exec: jest.fn().mockResolvedValueOnce(1),
      }) as any,
    );

    const links = linkDocArrayData;
    const foundLinks = await linkService.findAll({ page: 1, limit: 10 });

    expect(foundLinks).toEqual({ hasMore: false, links: links });
  });
});
