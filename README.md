# Tasker-service

* An API service which expose two API endpoint:
1. create:
```
POST /api/v1/tasker/create

{ type: <Task>, params: <Array<string | number>>}
```

* The service which get two type of tasks:

```node
export enum Task {
  Sum = 'sum',
  Concat = 'concat',
}
```
The route will respond to the user with the uuid related to the task result

2. get by uuid:
```
Get /api/v1/tasker/:uuid
```

Return task result if exist

**check the tmp.http file on the root folder for api request examples**

## Installation

```bash
$ npm install
```

## Running the docker-compose

```bash
$ docker-compose up -d
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
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

## TODO
* limit params length
* create a dlx + dlq 
* create a job to handle the naked messages
* create a retry mechanism to publish the message
* add test coverage 
* add unit test 
* add pre commit + pre publish hooks 
* add Dockerfile in order to create an image for the project to run an any env
* configure scale out by pending messages
* add swagger

