import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../app.module';

const gql = '/graphql';

const loginQuery = () => `
query login ($username: Email!, $password: String!) {
  login (username: $username, password: $password) {
    accessToken
  }
}
`;
const getLinksQuery = () => `
query getLinks($limit: Int, $page: Int){
  getLinks (limit: $limit, page: $page) {
    hasMore,
    links {
      id
      link
      title
      description
      likeCount
      createdAt
      createdBy
    }
  }
}
`;

const addLinkMutation = () => `
mutation addLink ($addLinkInput: AddLinkInput!) {
  addLink (addLinkInput: $addLinkInput) {
    id
    link
    title
    description
    createdAt
    createdBy
  }
}
`;

describe('LinksResolvers (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Query getLinks', () => {
    it('/graphql (POST) getLinks 401', () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: getLinksQuery(),
          variables: {
            limit: 10,
            page: 1,
          },
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.errors[0].status).toEqual(401);
          expect(res.body.errors[0].message).toEqual('Unauthorized');
        });
    });

    it('/graphql (POST) getLinks successfully', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: loginQuery(),
          variables: {
            username: 'nestjs1@demo.com',
            password: 'abc123',
          },
        });
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: getLinksQuery(),
          variables: {
            limit: 10,
            page: 1,
          },
        })
        .set('Authorization', `Bearer ${loginResponse.body.data.login.accessToken}`)
        .expect(200)
        .expect((res) => expect(res.body.data.getLinks.links).not.toEqual([]));
    });
  });

  describe('Mutation addLink', () => {
    const link = 'https://www.youtube.com/watch?v=EsCyUDJEKaA';
    it('/graphql (POST) addLink 401', () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: addLinkMutation(),
          variables: {
            addLinkInput: {
              link,
            },
          },
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.errors[0].status).toEqual(500);
          expect(res.body.errors[0].message).toEqual('Server Error');
        });
    });

    it('/graphql (POST) addLink successfully', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: loginQuery(),
          variables: {
            username: 'nestjs1@demo.com',
            password: 'abc123',
          },
        });
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: addLinkMutation(),
          variables: {
            addLinkInput: {
              link,
            },
          },
        })
        .set('Authorization', `Bearer ${loginResponse.body.data.login.accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.data.addLink).not.toEqual(null);
          expect(res.body.data.addLink.link).toEqual(link);
        });
    });
  });
});
