## Movies Server

Structure project with NestJS and Graphql

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# generate schema
$ npm run generate:schema

# seed links data
$ npx nestjs-command seed:links

# seed users data
$ npx nestjs-command seed:users

# eslint check
$ npm run lint
```

## Setup with Docker

```bash
# build node image
$ docker-compose build

# start the services
$ docker-compose up -d

# view the logs
docker-compose logs -f
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

With the server running, visit http://localhost:3000/graphql

## License

Nest is [MIT licensed](LICENSE).
