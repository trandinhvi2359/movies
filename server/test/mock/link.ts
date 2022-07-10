import { Link } from '../../src/links/interfaces/link.interface';

const mockLink = (
  title = 'Test',
  link = 'https://www.youtube.com/watch?v=eZxvfVZh3cQ',
  description = '123456789',
  likeCount = 5,
  createdAt = '1657447314418',
  createdBy = '5b3980c956d5a405cc4007c5',
): any => ({
  title,
  link,
  description,
  likeCount,
  createdAt,
  createdBy,
});

const mockLinkDoc = (mock?: Partial<Link> | any): Partial<Link> | any => ({
  title: mock?.title || 'Title',
  link: mock?.link || 'https://www.youtube.com/watch?v=eZxvfVZh3cQ',
  description: mock?.description || 'Test desctiption',
  _id: mock?._id || 'a uuid',
  likeCount: mock?.likeCount || 5,
  createdAt: mock?.createdAt || '1657447314418',
  createdBy: mock?.createdBy || '5b3980c956d5a405cc4007c5',
});

const linkArray = [
  mockLink(),
  mockLink(
    'Title',
    'https://www.youtube.com/watch?v=eZxvfVZh3cQ',
    'Test description',
    5,
    '1657447314418',
    '5b3980c956d5a405cc4007c5',
  ),
];

const linkDocArray = [
  mockLinkDoc(),
  mockLinkDoc({
    title: 'Title',
    _id: 'a new uuid',
    link: 'https://www.youtube.com/watch?v=eZxvfVZh3cQ',
    description: 'Test description',
    likeCount: 5,
    createdAt: '1657447314418',
    createdBy: '5b3980c956d5a405cc4007c6',
  }),
];

export { mockLink, mockLinkDoc, linkArray, linkDocArray };
