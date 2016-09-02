# Quiz app


## Getting up and running

####This project uses Node version 4.4.7 and PostgreSQL version 9.5.x

#### Database

Install postgres:
```bash
brew update
brew doctor
brew install postgres
```


To run the postgres server.

```bash
postgres -D /usr/local/var/postgres
```


This project comes with a handy convenience script to run the postgres server.  Simply:
```bash
npm run postgres
```
The project uses the [Node postgres module PG](https://github.com/brianc/node-postgres).

The database client is pooled, so that there is less of a bottleneck. currently set the pool connections to 100. Check PG documentation for more information on this: https://github.com/brianc/node-postgres

To setup the database schema on HEROKU, use the following command:
```bash
heroku pg:psql --app (APPNAME) DATABASE < ./path/to/schema
```
To connect a remote database instance to pgAdmin:
- go to `File > Add Server`.
- then follow this instructions at link: http://stackoverflow.com/questions/11769860/connect-to-a-heroku-database-with-pgadmin


## Testing

##### Database
When creating a client for the tests, we have to provide options to the `pg`.Pool.
- `idleTimeoutMillis` will quit the client automatically after a given number of milliseconds (i.e. 3000 = 3 seconds)
- `database` will link the client to the given database (for us its the `testing` database)

##### Coverage
Changed npm script to `check-coverage": "babel-node ./node_modules/babel-istanbul/lib/cli.js check-coverage"`

Don't need the tape and test file paths as the script for coverage will do so.

Also added this following option to the the `istanbul.yml` file to cover both root folders:
```
root: [ ./src, ./server ]
```

##### Circle CI
The Circle CI build environment must be set to Ubuntu 14.04 (Trusty) or higher, in order for Circle CI to run the tests using a PostgreSQL 9.5.x version.

To configure, on Circle CI go to:
```
Builds > Settings > Build Environment
```

## General information

#### Cookies

When setting the cookie from the server, it must be of type `string`.

```js
reply.state('cookie_name', cookie, { path: "/" })
```

#### Stack
* React
* React Router
* postgreSQL

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
