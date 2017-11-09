# Quodl

[![Build Status](https://circleci.com/gh/cul-2016/quiz.png?style=shield)](https://circleci.com/gh/cul-2016/quiz)
[![codecov.io](https://codecov.io/github/cul-2016/quiz/coverage.svg?branch=staging)](https://codecov.io/gh/cul-2016/quiz/branch/staging)
[![Dependency Status](https://david-dm.org/cul-2016/quiz.svg)](https://david-dm.org/cul-2016/quiz)
[![devDependency Status](https://david-dm.org/cul-2016/quiz/dev-status.svg)](https://david-dm.org/cul-2016/quiz#info=devDependencies)

#### This project uses [Node version 6.9.x](https://nodejs.org/en/), [PostgreSQL](https://www.postgresql.org/) version 9.5.x and [Redis 3.2.x](https://redis.io/).

## Quick Start

 - Ensure you have installed the correct versions of Node, Postgres and Redis as above by running:
```bash
node -v
redis-cli -v
postgres --version
```
 - Clone the project and cd: `git clone https://github.com/cul-2016/quiz.git && cd quiz`
 - Install the dependencies: `npm install`
 - In two different terminal windows ensure you have a postgres server running with:
 `npm run postgres` and a redis server running with: `redis-server`
 - Set up your local environment variables in a file called: `config.env` as follows:

/* config.env */
```bash
#!/bin/bash
unset PORT
export DATABASE_USER=<db_user>
export DATABASE_PASSWORD=<db_password>
export DATABASE_HOST=<aws_db_host>
export DATABASE_PORT=5432
export DATABASE_NAME=<db_name>
export TEMPLATE_DIRECTORY=./server/templates
export SENDER_EMAIL_ADDRESS=quiz.cityuni@gmail.com
export AWS_REGION=us-west-2
export AWS_ACCESS_KEY_ID=<aws_access_key>
export AWS_SECRET_ACCESS_KEY=<aws_secret_access_key>
export SERVER_ROUTE=http://localhost:9000
export JWT_SECRET=<secret>
```
and run `source local.env`
 - Start the server with: `npm start`
 - Visit `http://localhost:9000` to get started

## Testing

 - Ensure all of the above except for the last two points
 - Then run `npm test`
 - You can check code coverage locally with `npm run coverage`

## Deployment

To setup the database schema on HEROKU, use the following command:
```bash
heroku pg:psql --app (APPNAME) DATABASE < ./path/to/schema
```
(See the `load-staging-schema` script in the package if unsure)

To connect a remote database instance to pgAdmin:
- go to `File > Add Server`.
- then follow this instructions at link: http://stackoverflow.com/questions/11769860/connect-to-a-heroku-database-with-pgadmin

One off deployment Script to be run after the end of Sprint 6:
`UPDATE trophies SET trophy_name = 'overall_score' where trophy_name = 'overall_average';`
This is to ensure that the trophy for overall_average has been updated to overall_score.
**without this the app will crash, but will only need to be run once and once only on the live version of the app and every time the staging database is reset on the staging site**

## AWS Database

The live database is a postgresql instance, hosted on aws (rds). The class of the instance is db.t2.small during the week, and, using an aws lambda, is downgraded to db.t2.micro at the weekend, when the app will see the least use.

The upgrade/downgrade class and schedule can be edited on aws:
* To edit the class the database instance is up/downgraded to, you can change the environment variables of the lambda `modifyRDSInstanceClass`. The environment variables are as follows:
  * `instance` - The name of the database instance.
  * `upgrade` - The class to upgrade the instance to.
  * `downgrade` - The class to downgrade the instance to.
* To edit the schedule at which the database is up/downgraded you will need to add/edit/remove rules on aws `CloudWatch`. Rules should be set to trigger on a `schedule`, using a cron expression. For help figuring out the cron expression for the period you want to use (daily, weekly etc.), you can use https://crontab.guru/. The target of the rules should be set to the `modifyRDSInstanceClass` lambda, with a constant json input of `{"grade": required_term}`, where `required_term` is either `"upgrade"` or `"downgrade"`.
* Up/downgrading the database will cause a short period of downtime on the database (between 1 and 5 minutes), so it should not be set to happen too often.

Backups are automated to happen daily between 22:00 and 22:30. This window can be changed, but backups do not cause any significant downtime (a few seconds at most).

To manually modify the instance specifications, select the instance on the aws rds page, and choose `modify` from the `instance actions`. Any changes made here will occur during the maintenance window (Saturday 3:00am - 3:30am, but changeable) unless `Apply Immediately` is selected.

## Directory Structure
```
├── server
    ├── lib        # Helper functions for the server handlers logic
    ├── plugins    # Server plugins
    ├── templates  # Email templates see [dwyl/sendemail](https://github.com/dwyl/sendemail)
    |
    ├── server.js  # Main Server logic
    └── start.js   # Starts the server
├── src
    ├── js         # [Typical redux file structure](https://jaysoo.ca/2016/02/28/organizing-redux-application/)
        ├── actions
        ├── reducers
        ├── routes
        ├── container
        ├── components
        |
        ├── index.js   # Entry point
        ├── root.js
        ├── socket.js  # Implementation of socket.io
        └── store.js
    ├── scss           # To start the server
    └── utils          # Dev server configuration
├── test
    ├── front
    └── back
├── public # Files served by server
    ├── bundle.js  # Webpack bundle of the `src/js/index.js` entry point
    ├── index.html
    └── ...
├── package.json
├── README.md
└── ...
```

## General information

#### State hydration

##### onEnter hooks
`src/root.js` contains the routes for the different views.

Each route makes use of React Router's `onEnter` hooks.  Functions that run `onEnter` can be found in `src/js/lib/onEnterHooks.js`

All routes run an `authenticate` function, with the exception of the `IndexRoute` and the two routes that deal with user sign up.

Routes for the `ModuleContainer` and `StudentModuleContainer` views also run `fetchModule`.


##### Redux store listeners
Redux allows you to listen for state changes and run functions.

These listeners are located in `src/js/lib/subscriptions.js`.

`fetchDashboard` is registered when the `Dashboard` component is mounted.  It executes when `state.user.is_lecturer !== undefined`

`joinWebsocketRoom` is registered when the `Module` and `StudentModule` components are mounted.  It executes when `state.module.module_id !== undefined`.

### Quiz flow
##### Go to a module's page - you automatically enter that module's socket `room`.

##### Lecturer invites students to a particular quiz

##### `sendQuizInvite` is run, which runs `emitSendQuizInvite`
* `sendQuizInvite` dispatches three actions:
    1. `setIntervalID`
    2. `setQuizDetails`
    3. `getQuizQuestions`

##### `emitSendQuizInvite` emits the `send_quiz_invite` socket event on an interval

##### `receive_quiz_invite` is received by students
* `receive_quiz_invite` dispatches:
    1. `OPEN_QUIZ` --> sets `isQuizOpen` in student state to true

##### Button to the live-quiz page is activated (because `isQuizOpen`)

##### Lecturer starts the quiz

##### `startQuiz` is run, which runs `sendNextQuestion`
* `startQuiz` dispatches two actions:
    1. `START_QUIZ` - sets `isQuizStarted` in lecturer state to true
    2. `GO_TO_NEXT_QUESTION` --> updates `nextQuestionIndex` in lecturer state

##### `emitSendNextQuestion` emits the `send_next_question` socket event

##### `receive_next_question` is received by students
* One action is dispatched
    1. `SET_NEXT_QUESTION`
*  If `!isQuizStarted`, two additional actions are dispatched (before `SET_NEXT_QUESTION`):
    2. `SET_QUIZ_DETAILS`
    3. `START_QUIZ`



### Load Testing

##### We are using artillery for load testing the application. You'll find three files in the root directory with the prefix of `loadtest`.
- local
- staging
- production

Here are the list of steps that you'll need to take for stress Testing
1. install `artillery` with `npm i -g artillery`
2. get cookie from the app. You'll need to login to each version of the app as student@city.ac.uk and then use the cookie.
3. Paste this cookie in the related `loadtest` file. You will need to replace the following text `get cookie from headers in the live app for user student@city.ac.uk and paste it here` with your new cookie
4. run the following command to run the loadtests and pipe the results into a .txt file `artillery run loadtest-{version}.yml > loadtest-{version}.txt`
5. Once the loadtesting is complete you can view the results in the `.txt` file.

### Our finding on the load testing

##### Staging
The staging version of the app is hosted on basic heroku with no paid options. (free postgres w/ option of 10 max concurrent connections). We reach saturation point in phase 6 of the load testing where it starts to throw errors when it reaches ~60 concurrent users

##### Live
The live version of the app is hosted on 1 dyno @ $25 with a paid standard-0 database @ $50 which can have 120 concurrent connections. We reached a saturation point somewhere between 320 - 500 concurrent users where it started to throw erros. This is approximately a six fold increase.
