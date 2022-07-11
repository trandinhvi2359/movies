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

const registerMutation = () => `
mutation register ($registerInput: RegisterInput) {
  register (registerInput: $registerInput) {
    id
    name
    email
  }
}
`;

describe('AuthResolvers (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Query login', () => {
    it('/graphql (POST) login successfully', () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: loginQuery(),
          variables: {
            username: 'nestjs1@demo.com',
            password: 'abc123',
          },
        })
        .expect(200)
        .expect((res) => expect(res.body.data.login).not.toBeNull());
    });

    it('/graphql (POST) login 401', () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: loginQuery(),
          variables: {
            username: 'not-exist@demo.com',
            password: 'abc123',
          },
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.errors[0].status).toEqual(401);
          expect(res.body.errors[0].message).toEqual('Unauthenticated');
        });
    });

    it('/graphql (POST) login 400', () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: loginQuery(),
          variables: {},
        })
        .expect(400);
    });
  });

  describe('Mutation register', () => {
    it('/graphql (POST) register successfully', () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: registerMutation(),
          variables: {
            registerInput: {
              name: 'vi test 1',
              username: 'test2@gmail.com',
              password: '123456789',
            },
          },
        })
        .expect(200);
    });

    it('/graphql (POST) register 400', () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: registerMutation(),
          variables: {
            registerInput: {},
          },
        })
        .expect(400);
    });

    it('/graphql (POST) register 400', () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: registerMutation(),
          variables: {
            registerInput: {
              name: 'vi test 1',
              username: 'invalid-email',
              password: '123456789',
            },
          },
        })
        .expect(400);
    });
  });
});
